const express = require('express');
const router = express.Router();
const { getDeployments, createDeployment, getDashboardMetrics } = require('../controllers/deploymentController');

// 👇 YEH IMPORT MISSING THA
const Deployment = require('../models/Deployment'); 

// 1. Specific Routes hamesha sabse UPAR aayenge
router.get('/metrics', getDashboardMetrics);

// 2. Base routes beech mein
router.route('/')
    .get(getDeployments)
    .post(createDeployment);

// 3. Dynamic routes (/:id) hamesha sabse NEECHE aayenge
router.get('/:id', async (req, res) => {
    try {
        const deployment = await Deployment.findById(req.params.id);
        if (!deployment) {
            return res.status(404).json({ message: 'Deployment not found' });
        }
        res.json(deployment);
    } catch (error) {
        console.error("Error fetching single deployment:", error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;