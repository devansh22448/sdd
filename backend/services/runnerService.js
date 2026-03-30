const { spawn } = require('child_process');
const { getIo } = require('../sockets/logStreamer');
const Deployment = require('../models/Deployment');

const runDeploymentProcess = async (deploymentId) => {
    try {
        await Deployment.findByIdAndUpdate(deploymentId, { status: 'Running' });
        
        // SERVER TERMINAL LOG
        console.log(`\n▶️ [SERVER] Starting deployment ID: ${deploymentId}`); 
        
        const io = getIo();
        io.emit('log', { deploymentId, message: `[INFO] Starting deployment ID: ${deploymentId}...` });

        const isWindows = process.platform === 'win32';
        const shell = isWindows ? 'cmd.exe' : 'bash';
        
        const script = isWindows 
            ? ['/c', 'echo Installing dependencies... && ping 127.0.0.1 -n 3 > nul && echo Building project... && ping 127.0.0.1 -n 4 > nul && echo Application deployed successfully!'] 
            : ['-c', 'echo "Installing dependencies..." && sleep 2 && echo "Building project..." && sleep 3 && echo "Application deployed successfully!"'];

        const child = spawn(shell, script);

        child.stdout.on('data', (data) => {
            const output = data.toString().trim();
            // SERVER TERMINAL LOG
            console.log(`🟢 [STDOUT]: ${output}`); 
            io.emit('log', { deploymentId, message: `[SUCCESS] ${output}` });
        });

        child.stderr.on('data', (data) => {
            const error = data.toString().trim();
            // SERVER TERMINAL LOG
            console.log(`🔴 [STDERR]: ${error}`); 
            io.emit('log', { deploymentId, message: `[ERROR] ${error}` });
        });

        child.on('close', async (code) => {
            const finalStatus = code === 0 ? 'Success' : 'Failed';
            
            await Deployment.findByIdAndUpdate(deploymentId, { 
                status: finalStatus,
                duration: '5s' 
            });

            // SERVER TERMINAL LOG
            console.log(`🏁 [SERVER] Process exited with code ${code}. Final Status: ${finalStatus}\n`); 
            
            io.emit('log', { deploymentId, message: `[INFO] Process exited with status code ${code}. Final Status: ${finalStatus}` });
            io.emit('statusUpdate', { deploymentId, status: finalStatus }); 
        });

    } catch (error) {
        console.error("Runner Error:", error);
    }
};

module.exports = { runDeploymentProcess };