const mongoose = require("mongoose");

const environmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["development", "staging", "production"],
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "maintenance"],
      default: "active",
    },
    config: {
      baseUrl: String,
      apiEndpoint: String,
      databaseUrl: String,
      variables: {
        type: Map,
        of: String,
      },
    },
    healthCheck: {
      enabled: { type: Boolean, default: true },
      url: String,
      interval: { type: Number, default: 300 }, // seconds
      timeout: { type: Number, default: 30 }, // seconds
    },
    resources: {
      cpu: String,
      memory: String,
      storage: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    team: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    lastDeployment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Deployment",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Environment", environmentSchema);