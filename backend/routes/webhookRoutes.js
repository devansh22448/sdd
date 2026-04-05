const express = require('express');
const router = express.Router();
const Deployment = require('../models/Deployment');
const { runDeploymentProcess } = require('../services/runnerService');
const { getIo } = require('../sockets/logStreamer'); 

router.post('/github', async (req, res) => {
    try {
        const eventType = req.headers['x-github-event'];
        
        if (eventType === 'push') {
            const repoName = req.body.repository.name;
            const branch = req.body.ref.split('/').pop();
            const commitHash = req.body.after.substring(0, 7);
            
            // 👇 YEH 2 NAYI LINES: GitHub ko wapas message bhejne ke liye chahiye
            const owner = req.body.repository.owner.login;
            const fullSha = req.body.after;
            const cloneUrl = req.body.repository.clone_url;

            console.log(`\n🔔 [WEBHOOK] Push detected in repo: ${repoName} on branch: ${branch}`);

            const newDeployment = await Deployment.create({
                project: repoName,
                environment: branch === 'main' ? 'Production' : 'Staging',
                version: commitHash,
                status: 'Running' 
            });

            const io = getIo();
            io.emit('newDeployment', newDeployment);

            // 👇 Runner function ko ab owner aur fullSha bhi bhej rahe hain
            runDeploymentProcess(newDeployment._id, owner, repoName, fullSha, cloneUrl);
        }

        res.status(200).send('Webhook received.');

    } catch (error) {
        console.error("Webhook Error:", error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;