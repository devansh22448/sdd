const express = require("express");
const router = express.Router();
const environmentController = require("../controllers/environmentController");
const { protect } = require("../middleware/authMiddleware");

// All routes require authentication
router.use(protect);

// Get all environments
router.get("/", environmentController.getAllEnvironments);

// Get environment health status
router.get("/health", environmentController.getEnvironmentHealth);

// Get environment by ID
router.get("/:id", environmentController.getEnvironmentById);

// Create new environment
router.post("/", environmentController.createEnvironment);

// Update environment
router.put("/:id", environmentController.updateEnvironment);

// Delete environment
router.delete("/:id", environmentController.deleteEnvironment);

// Add team member
router.post("/:id/team", environmentController.addTeamMember);

// Remove team member
router.delete("/:id/team/:userId", environmentController.removeTeamMember);

module.exports = router;
