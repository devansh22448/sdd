const mongoose = require("mongoose");

const deploymentSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
      trim: true,
    },
    environment: {
      type: String,
      required: true,
      trim: true,
    },
    commitId: {
      type: String,
      trim: true,
    },
    branch: {
      type: String,
      required: true,
      default: "main",
    },
    triggeredBy: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    startTime: {
      type: Date,
      default: Date.now,
    },
    endTime: {
      type: Date,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "running",
        "success",
        "failed",
        "cancelled",
        "rolled_back",
      ],
      default: "pending",
    },
    logs: [
      {
        timestamp: {
          type: Date,
          default: Date.now,
        },
        message: {
          type: String,
        },
        level: {
          type: String,
          enum: ["info", "warning", "error", "debug"],
          default: "info",
        },
      },
    ],
    errorMessage: {
      type: String,
    },
    rollbackInfo: {
      previousDeploymentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Deployment",
      },
      rollbackTime: Date,
      rolledBackBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    duration: {
      type: Number, // in seconds
    },
    artifacts: [
      {
        name: String,
        path: String,
        size: Number,
      },
    ],
    metadata: {
      type: Map,
      of: String,
    },
  },
  {
    timestamps: true,
  },
);

// Index for efficient querying
deploymentSchema.index({ projectName: 1, environment: 1, status: 1 });
deploymentSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Deployment", deploymentSchema);
