const express = require("express");
const router = express.Router();
const {
  getActiveFooter,
  createFooter,
  updateFooter,
  deleteFooter,
  getAllFooters,
  getFooterById,
} = require("../controllers/footerController");

// Public routes
router.get("/", getActiveFooter); // Get active footer

// Admin routes (these would typically be protected by auth middleware)
router.get("/all", getAllFooters); // Get all footers (admin)
router.get("/:id", getFooterById); // Get footer by ID (admin)
router.post("/", createFooter); // Create footer (admin)
router.put("/:id", updateFooter); // Update footer (admin)
router.delete("/:id", deleteFooter); // Delete footer (admin)

module.exports = router;
