const mongoose = require('mongoose');

const deploymentSchema = new mongoose.Schema({
    project: { type: String, required: true },
    repoUrl: { type: String },
    branch: { type: String, default: 'main' },
    deployMessage: { type: String },
    environment: { type: String, default: 'Production' },
    version: { type: String, default: 'latest' },
    status: { type: String, default: 'Pending' },
    duration: { type: String, default: '-' },
    startedAt: { type: Date },
    completedAt: { type: Date },
    triggeredBy: { type: String },
    // 👇 YEH NAYA BLOCK ADD KIYA HAI
    logs: [{
        timestamp: { type: Date, default: Date.now },
        level: { type: String, default: 'info' },
        message: { type: String }
    }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Deployment', deploymentSchema);