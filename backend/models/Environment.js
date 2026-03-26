const mongoose = require("mongoose");

const environmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    config: {
      type: Map,
      of: String,
    },
    deploymentScript: {
      type: String,
      default: "deploy.sh",
    },
    rollbackScript: {
      type: String,
      default: "rollback.sh",
    },
    healthCheckUrl: {
      type: String,
    },
    timeout: {
      type: Number,
      default: 300, // 5 minutes
    },
    maxRetries: {
      type: Number,
      default: 3,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Environment", environmentSchema);
