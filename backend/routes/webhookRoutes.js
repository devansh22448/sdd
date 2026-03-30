const express = require('express');
const router = express.Router();
const Deployment = require('../models/Deployment');
const { runDeploymentProcess } = require('../services/runnerService');
// 👇 Naya Import: Socket.io ko yahan laye
const { getIo } = require('../sockets/logStreamer'); 

router.post('/github', async (req, res) => {
    try {
        const eventType = req.headers['x-github-event'];
        
        if (eventType === 'push') {
            const repoName = req.body.repository.name;
            const branch = req.body.ref.split('/').pop();
            const commitHash = req.body.after.substring(0, 7);

            console.log(`\n🔔 [WEBHOOK] Push detected in repo: ${repoName} on branch: ${branch}`);

            const newDeployment = await Deployment.create({
                project: repoName,
                environment: branch === 'main' ? 'Production' : 'Staging',
                version: commitHash || 'latest',
                status: 'Running' 
            });

            // 👇 MAGIC LINE: Frontend ko turant batao ki naya deployment aaya hai!
            const io = getIo();
            io.emit('newDeployment', newDeployment);

            runDeploymentProcess(newDeployment._id);
        }

        res.status(200).send('Webhook received and processing started.');

    } catch (error) {
        console.error("Webhook Error:", error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;