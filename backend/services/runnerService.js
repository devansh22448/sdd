const Deployment = require('../models/Deployment');
const { getIo } = require('../sockets/logStreamer');
const axios = require('axios');
const { spawn } = require('child_process'); // 👈 Asli terminal commands chalane ke liye
const fs = require('fs');
const path = require('path');

const updateGitHubStatus = async (owner, repo, sha, state, description) => {
    if(!process.env.GITHUB_TOKEN || !owner || !sha) return;
    try {
        await axios.post(`https://api.github.com/repos/${owner}/${repo}/statuses/${sha}`, {
            state: state,
            target_url: 'http://localhost:5173/deployments',
            description: description,
            context: 'Smart DevOps CI'
        }, {
            headers: {
                Authorization: `token ${process.env.GITHUB_TOKEN}`,
                Accept: 'application/vnd.github.v3+json'
            }
        });
    } catch (err) {
        console.error('Failed to update GitHub status:', err.message);
    }
};

// 👇 NAYA HELPER FUNCTION: Jo asli command chalayega aur uske live logs pakdega
const runCommand = (command, args, workDir, emitLog) => {
    return new Promise((resolve, reject) => {
        // 'spawn' ek naya terminal process kholta hai
        const proc = spawn(command, args, { cwd: workDir, shell: true });

        // Jab stdout (normal log) aaye, toh use turant frontend ko bhejo
        proc.stdout.on('data', (data) => {
            const lines = data.toString().split('\n').filter(line => line.trim() !== '');
            lines.forEach(line => emitLog(line));
        });

        // Jab stderr (warning/error log) aaye
        proc.stderr.on('data', (data) => {
             const lines = data.toString().split('\n').filter(line => line.trim() !== '');
             lines.forEach(line => emitLog(`[WARN/ERR] ${line}`));
        });

        // Jab process khatam ho
        proc.on('close', (code) => {
            if (code === 0) resolve();
            else reject(new Error(`Command "${command} ${args.join(' ')}" failed with exit code ${code}`));
        });
    });
};

// 👇 NAYA RUNNER: Ab isme cloneUrl bhi aayega
const runDeploymentProcess = async (deploymentId, owner, repoName, fullSha, cloneUrl) => {
    const startTime = Date.now();
    try {
        const io = getIo();
        
        const emitAndSaveLog = async (message, level = 'info') => {
            const logEntry = { timestamp: new Date(), level, message };
            io.emit('log', { deploymentId, ...logEntry, timestamp: logEntry.timestamp.toLocaleTimeString() });
            await Deployment.findByIdAndUpdate(deploymentId, { $push: { logs: logEntry } });
        };

        await Deployment.findByIdAndUpdate(deploymentId, { status: 'Running' });
        io.emit('statusUpdate', { deploymentId, status: 'Running' });
        await updateGitHubStatus(owner, repoName, fullSha, 'pending', 'Deployment is running...');

        await emitAndSaveLog('> [SYSTEM] Initializing build environment...');

        // 1. Setup Build Directory
        const buildsDir = path.join(__dirname, '../../temp-builds');
        if (!fs.existsSync(buildsDir)) fs.mkdirSync(buildsDir, { recursive: true });
        
        const projectDir = path.join(buildsDir, `${repoName}-${deploymentId}`);
        
        // 2. REAL GIT CLONE
        await emitAndSaveLog(`> [SYSTEM] Running: git clone ${cloneUrl}`);
        await runCommand('git', ['clone', cloneUrl, projectDir], buildsDir, emitAndSaveLog);
        
        // 3. REAL NPM INSTALL (Agar package.json hai)
        if (fs.existsSync(path.join(projectDir, 'package.json'))) {
            await emitAndSaveLog('> [SYSTEM] Found package.json. Running: npm install');
            await runCommand('npm', ['install'], projectDir, emitAndSaveLog);
            
            // Optional: REAL NPM RUN BUILD
            // await emitAndSaveLog('> [SYSTEM] Running: npm run build');
            // await runCommand('npm', ['run', 'build'], projectDir, emitAndSaveLog);
        } else {
            await emitAndSaveLog('> [SYSTEM] No package.json found. Skipping npm install.');
        }

        await emitAndSaveLog('> [SUCCESS] Pipeline execution finished perfectly! 🚀', 'success');

        const durationSeconds = Math.floor((Date.now() - startTime) / 1000);
        const finalDuration = `${durationSeconds}s`;

        await Deployment.findByIdAndUpdate(deploymentId, { status: 'Success', duration: finalDuration });
        io.emit('statusUpdate', { deploymentId, status: 'Success', duration: finalDuration });
        await updateGitHubStatus(owner, repoName, fullSha, 'success', `Deployed successfully in ${finalDuration}`);

    } catch (error) {
        console.error("Runner Failed:", error.message);
        const durationSeconds = Math.floor((Date.now() - startTime) / 1000);
        
        await Deployment.findByIdAndUpdate(deploymentId, { status: 'Failed', duration: `${durationSeconds}s` });
        getIo().emit('statusUpdate', { deploymentId, status: 'Failed' });
        
        const logEntry = { timestamp: new Date(), level: 'error', message: `> [ERROR] ${error.message}` };
        await Deployment.findByIdAndUpdate(deploymentId, { $push: { logs: logEntry } });
        getIo().emit('log', { deploymentId, ...logEntry, timestamp: logEntry.timestamp.toLocaleTimeString() });

        await updateGitHubStatus(owner, repoName, fullSha, 'failure', 'Deployment failed');
    }
};

module.exports = { runDeploymentProcess };