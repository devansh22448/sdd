const mongoose = require("mongoose");

const deploymentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    environment: {
      type: String,
      required: true,
      enum: ["development", "staging", "production"],
    },
    status: {
      type: String,
      enum: ["pending", "in_progress", "success", "failed", "rolled_back"],
      default: "pending",
    },
    version: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    repository: {
      type: String,
    },
    branch: {
      type: String,
      default: "main",
    },
    commitHash: {
      type: String,
    },
    deployedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    deployedAt: {
      type: Date,
      default: Date.now,
    },
    completedAt: {
      type: Date,
    },
    duration: {
      type: Number, // in seconds
    },
    logs: [
      {
        timestamp: { type: Date, default: Date.now },
        level: { type: String, enum: ["info", "warn", "error", "debug"] },
        message: String,
      },
    ],
    artifacts: [
      {
        name: String,
        url: String,
        size: Number,
        type: String,
      },
    ],
    metrics: {
      cpu: Number,
      memory: Number,
      responseTime: Number,
    },
    rollbackHistory: [
      {
        version: String,
        rolledBackAt: Date,
        rolledBackBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        reason: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

// Index for querying deployments
deploymentSchema.index({ status: 1, environment: 1 });
deploymentSchema.index({ deployedAt: -1 });

module.exports = mongoose.model("Deployment", deploymentSchema);