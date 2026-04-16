const Deployment = require('../models/Deployment');

const getLogs = async (req, res) => {
    try {
        const { status, environment, limit = 50, page = 1, search } = req.query;
        let query = {};

        if (status && status !== 'All') query.status = status;
        if (environment && environment !== 'All') query.environment = environment;

        if (search) {
            query.$or = [
                { project: { $regex: search, $options: 'i' } },
                { deployMessage: { $regex: search, $options: 'i' } },
                { repoUrl: { $regex: search, $options: 'i' } }
            ];
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const logs = await Deployment.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit))
            // Exclude logs array from the main list API to save bandwidth
            .select('-logs');

        const total = await Deployment.countDocuments(query);

        res.json({
            data: logs,
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit))
        });
    } catch (error) {
        console.error("Log Fetch Error:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getLogById = async (req, res) => {
    try {
        const deployment = await Deployment.findById(req.params.id);
        if (!deployment) return res.status(404).json({ message: 'Log not found' });
        res.json(deployment);
    } catch (error) {
        console.error("Log details error:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getLogs, getLogById };
