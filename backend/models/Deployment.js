const mongoose = require('mongoose');

const deploymentSchema = mongoose.Schema({
    // Corresponds to your "PROJECT" column (e.g., "Frontend App", "Backend API")
    project: { 
        type: String, 
        required: true 
    },
    // Corresponds to your "STATUS" column 
    status: { 
        type: String, 
        required: true, 
        enum: ['Pending', 'Running', 'Success', 'Failed'], 
        default: 'Pending' 
    },
    // Corresponds to your "DURATION" column (e.g., "3m 24s")
    duration: { 
        type: String, 
        default: '-' 
    },
    // Extra metadata useful for the Dashboard history
    environment: { 
        type: String, 
        default: 'Production' 
    },
    version: { 
        type: String, 
        default: 'v1.0.0' 
    }
}, {
    timestamps: true // Automatically creates 'createdAt' (for your "TIME" column) and 'updatedAt'
});

module.exports = mongoose.model('Deployment', deploymentSchema);