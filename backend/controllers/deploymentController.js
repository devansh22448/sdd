const Deployment = require("../models/Deployment");

// Get all deployments
exports.getAllDeployments = async (req, res) => {
  try {
    const { status, environment, limit = 50, skip = 0 } = req.query;

    const query = {};
    if (status) query.status = status;
    if (environment) query.environment = environment;

    const deployments = await Deployment.find(query)
      .populate("deployedBy", "username email firstName lastName")
      .sort({ deployedAt: -1 })
      .skip(parseInt(skip))
      .limit(parseInt(limit));

    const total = await Deployment.countDocuments(query);

    res.json({
      deployments,
      total,
      limit: parseInt(limit),
      skip: parseInt(skip),
    });
  } catch (error) {
    console.error("Get deployments error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get deployment by ID
exports.getDeploymentById = async (req, res) => {
  try {
    const deployment = await Deployment.findById(req.params.id)
      .populate("deployedBy", "username email firstName lastName")
      .populate("rollbackHistory.rolledBackBy", "username email");

    if (!deployment) {
      return res.status(404).json({ message: "Deployment not found" });
    }

    res.json(deployment);
  } catch (error) {
    console.error("Get deployment error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create new deployment
exports.createDeployment = async (req, res) => {
  try {
    const {
      name,
      environment,
      version,
      description,
      repository,
      branch,
      commitHash,
    } = req.body;

    const deployment = new Deployment({
      name,
      environment,
      version,
      description,
      repository,
      branch,
      commitHash,
      deployedBy: req.user.id,
      status: "pending",
    });

    await deployment.save();

    // Populate deployedBy for response
    await deployment.populate(
      "deployedBy",
      "username email firstName lastName",
    );

    res.status(201).json({
      message: "Deployment created successfully",
      deployment,
    });
  } catch (error) {
    console.error("Create deployment error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update deployment status
exports.updateDeploymentStatus = async (req, res) => {
  try {
    const { status, logs, metrics } = req.body;

    const deployment = await Deployment.findById(req.params.id);
    if (!deployment) {
      return res.status(404).json({ message: "Deployment not found" });
    }

    deployment.status = status;

    if (logs && logs.length > 0) {
      deployment.logs.push(...logs);
    }

    if (metrics) {
      deployment.metrics = metrics;
    }

    if (status === "success" || status === "failed") {
      deployment.completedAt = new Date();
      deployment.duration = Math.floor(
        (deployment.completedAt - deployment.deployedAt) / 1000,
      );
    }

    await deployment.save();

    await deployment.populate(
      "deployedBy",
      "username email firstName lastName",
    );

    res.json({
      message: "Deployment status updated",
      deployment,
    });
  } catch (error) {
    console.error("Update deployment status error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Rollback deployment
exports.rollbackDeployment = async (req, res) => {
  try {
    const { reason } = req.body;

    const deployment = await Deployment.findById(req.params.id);
    if (!deployment) {
      return res.status(404).json({ message: "Deployment not found" });
    }

    if (deployment.status !== "success") {
      return res
        .status(400)
        .json({ message: "Can only rollback successful deployments" });
    }

    // Add to rollback history
    deployment.rollbackHistory.push({
      version: deployment.version,
      rolledBackAt: new Date(),
      rolledBackBy: req.user.id,
      reason,
    });

    deployment.status = "rolled_back";
    await deployment.save();

    res.json({
      message: "Deployment rolled back successfully",
      deployment,
    });
  } catch (error) {
    console.error("Rollback deployment error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get deployment statistics
exports.getDeploymentStats = async (req, res) => {
  try {
    const stats = await Deployment.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const environmentStats = await Deployment.aggregate([
      {
        $group: {
          _id: "$environment",
          count: { $sum: 1 },
        },
      },
    ]);

    // Calculate average duration for successful deployments
    const avgDuration = await Deployment.aggregate([
      { $match: { status: "success" } },
      {
        $group: {
          _id: null,
          avgDuration: { $avg: "$duration" },
        },
      },
    ]);

    res.json({
      byStatus: stats,
      byEnvironment: environmentStats,
      avgDuration: avgDuration[0]?.avgDuration || 0,
    });
  } catch (error) {
    console.error("Get deployment stats error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete deployment
exports.deleteDeployment = async (req, res) => {
  try {
    const deployment = await Deployment.findById(req.params.id);
    if (!deployment) {
      return res.status(404).json({ message: "Deployment not found" });
    }

    await deployment.deleteOne();
    res.json({ message: "Deployment deleted successfully" });
  } catch (error) {
    console.error("Delete deployment error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
