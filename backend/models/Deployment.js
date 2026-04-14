const mongoose = require('mongoose');

const deploymentSchema = new mongoose.Schema({
    project: { type: String, required: true },
    environment: { type: String, default: 'Production' },
    version: { type: String, required: true },
    status: { type: String, default: 'Pending' },
    duration: { type: String, default: '-' },
    // 👇 YEH NAYA BLOCK ADD KIYA HAI
    logs: [{
        timestamp: { type: Date, default: Date.now },
        level: { type: String, default: 'info' },
        message: { type: String }
    }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Deployment', deploymentSchema);