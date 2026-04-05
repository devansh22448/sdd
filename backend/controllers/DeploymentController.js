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
        const total = await Deployment.countDocuments();
        const success = await Deployment.countDocuments({ status: 'Success' });
        const failed = await Deployment.countDocuments({ status: 'Failed' });
        const pending = await Deployment.countDocuments({ status: { $in: ['Pending', 'Running'] } });

        // 👇 NAYA LOGIC: Pichle 7 din ka data nikalne ke liye
        const chartData = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }); // Jaise: "Apr 4"

            // Us specific din ki starting aur ending time
            const startOfDay = new Date(d.setHours(0, 0, 0, 0));
            const endOfDay = new Date(d.setHours(23, 59, 59, 999));

            // Database se us din ke pass aur fail records count karo
            const daySuccess = await Deployment.countDocuments({ 
                status: 'Success', 
                createdAt: { $gte: startOfDay, $lte: endOfDay } 
            });
            const dayFailed = await Deployment.countDocuments({ 
                status: 'Failed', 
                createdAt: { $gte: startOfDay, $lte: endOfDay } 
            });

            chartData.push({
                name: dateStr,
                success: daySuccess,
                failed: dayFailed
            });
        }

        res.json({ total, success, failed, pending, chartData });
    } catch (error) {
        console.error("Metrics Error:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getDeployments, createDeployment, getDashboardMetrics };