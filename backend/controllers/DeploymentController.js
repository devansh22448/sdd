const { runDeploymentProcess } = require('../services/runnerService');
const Deployment = require('../models/Deployment');

// 1. Get all deployments (Feeds your Deployments Table)
const getDeployments = async (req, res) => {
    try {
        const deployments = await Deployment.find().sort({ createdAt: -1 });
        res.status(200).json(deployments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. Create a new deployment (Triggered by "+ New Deployment" button)
const createDeployment = async (req, res) => {
    try {
        const { project, environment, version } = req.body;
        
        const deployment = await Deployment.create({
            project: project || 'Unknown Project',
            environment: environment || 'Production',
            version: version || 'latest',
            status: 'Pending'
        });

        // JAADU YAHAN HAI: Background mein terminal commands chalana shuru kardo, HTTP response return karne ka wait mat karo
        runDeploymentProcess(deployment._id);

        res.status(201).json(deployment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 3. Get Dashboard Metrics (Feeds your top 3 cards and pie chart)
const getDashboardMetrics = async (req, res) => {
    try {
        const totalRunning = await Deployment.countDocuments({ status: 'Running' });
        const totalSuccess = await Deployment.countDocuments({ status: 'Success' });
        const totalFailed = await Deployment.countDocuments({ status: 'Failed' });
        
        res.status(200).json({
            running: totalRunning,
            success: totalSuccess,
            failed: totalFailed,
            total: totalRunning + totalSuccess + totalFailed
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getDeployments, createDeployment, getDashboardMetrics };