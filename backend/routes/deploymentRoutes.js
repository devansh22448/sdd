const express = require("express");
const router = express.Router();
const deploymentController = require("../controllers/deploymentController");
const { protect } = require("../middleware/authMiddleware");

// All routes require authentication
router.use(protect);

// Get all deployments
router.get("/", deploymentController.getAllDeployments);

// Get deployment statistics
router.get("/stats", deploymentController.getDeploymentStats);

// Get deployment by ID
router.get("/:id", deploymentController.getDeploymentById);

// Create new deployment
router.post("/", deploymentController.createDeployment);

// Update deployment status
router.put("/:id/status", deploymentController.updateDeploymentStatus);

// Rollback deployment
router.post("/:id/rollback", deploymentController.rollbackDeployment);

// Delete deployment
router.delete("/:id", deploymentController.deleteDeployment);

module.exports = router;
