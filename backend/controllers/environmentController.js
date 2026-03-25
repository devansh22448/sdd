const Environment = require("../models/Environment");
const Deployment = require("../models/Deployment");

// Get all environments
exports.getAllEnvironments = async (req, res) => {
  try {
    const environments = await Environment.find()
      .populate("owner", "username email firstName lastName")
      .populate("team", "username email firstName lastName")
      .populate("lastDeployment");

    res.json(environments);
  } catch (error) {
    console.error("Get environments error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get environment by ID
exports.getEnvironmentById = async (req, res) => {
  try {
    const environment = await Environment.findById(req.params.id)
      .populate("owner", "username email firstName lastName")
      .populate("team", "username email firstName lastName")
      .populate("lastDeployment");

    if (!environment) {
      return res.status(404).json({ message: "Environment not found" });
    }

    res.json(environment);
  } catch (error) {
    console.error("Get environment error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create new environment
exports.createEnvironment = async (req, res) => {
  try {
    const { name, type, description, config, healthCheck, resources } =
      req.body;

    // Check if environment with same name exists
    const existingEnv = await Environment.findOne({ name });
    if (existingEnv) {
      return res
        .status(400)
        .json({ message: "Environment with this name already exists" });
    }

    const environment = new Environment({
      name,
      type,
      description,
      config,
      healthCheck,
      resources,
      owner: req.user.id,
    });

    await environment.save();
    await environment.populate("owner", "username email firstName lastName");

    res.status(201).json({
      message: "Environment created successfully",
      environment,
    });
  } catch (error) {
    console.error("Create environment error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update environment
exports.updateEnvironment = async (req, res) => {
  try {
    const { name, description, status, config, healthCheck, resources, team } =
      req.body;

    const environment = await Environment.findById(req.params.id);
    if (!environment) {
      return res.status(404).json({ message: "Environment not found" });
    }

    if (name && name !== environment.name) {
      const existingEnv = await Environment.findOne({ name });
      if (existingEnv) {
        return res
          .status(400)
          .json({ message: "Environment with this name already exists" });
      }
    }

    if (name) environment.name = name;
    if (description) environment.description = description;
    if (status) environment.status = status;
    if (config)
      environment.config = { ...environment.config.toObject(), ...config };
    if (healthCheck)
      environment.healthCheck = { ...environment.healthCheck, ...healthCheck };
    if (resources) environment.resources = resources;
    if (team) environment.team = team;

    await environment.save();
    await environment.populate("owner", "username email firstName lastName");
    await environment.populate("team", "username email firstName lastName");

    res.json({
      message: "Environment updated successfully",
      environment,
    });
  } catch (error) {
    console.error("Update environment error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete environment
exports.deleteEnvironment = async (req, res) => {
  try {
    const environment = await Environment.findById(req.params.id);
    if (!environment) {
      return res.status(404).json({ message: "Environment not found" });
    }

    // Check if there are any active deployments
    const activeDeployments = await Deployment.countDocuments({
      environment: environment.name,
      status: { $in: ["pending", "in_progress"] },
    });

    if (activeDeployments > 0) {
      return res.status(400).json({
        message: "Cannot delete environment with active deployments",
      });
    }

    await environment.deleteOne();
    res.json({ message: "Environment deleted successfully" });
  } catch (error) {
    console.error("Delete environment error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get environment health status
exports.getEnvironmentHealth = async (req, res) => {
  try {
    const environments = await Environment.find({ status: "active" });

    const healthStatuses = await Promise.all(
      environments.map(async (env) => {
        // Get recent deployments for this environment
        const recentDeployment = await Deployment.findOne({
          environment: env.name,
        }).sort({ deployedAt: -1 });

        return {
          id: env._id,
          name: env.name,
          type: env.type,
          status: env.status,
          healthCheckEnabled: env.healthCheck?.enabled,
          lastDeployment: recentDeployment
            ? {
                status: recentDeployment.status,
                deployedAt: recentDeployment.deployedAt,
              }
            : null,
        };
      }),
    );

    res.json(healthStatuses);
  } catch (error) {
    console.error("Get environment health error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add team member to environment
exports.addTeamMember = async (req, res) => {
  try {
    const { userId } = req.body;

    const environment = await Environment.findById(req.params.id);
    if (!environment) {
      return res.status(404).json({ message: "Environment not found" });
    }

    if (!environment.team.includes(userId)) {
      environment.team.push(userId);
      await environment.save();
    }

    await environment.populate("team", "username email firstName lastName");

    res.json({
      message: "Team member added successfully",
      team: environment.team,
    });
  } catch (error) {
    console.error("Add team member error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Remove team member from environment
exports.removeTeamMember = async (req, res) => {
  try {
    const { userId } = req.params;

    const environment = await Environment.findById(req.params.id);
    if (!environment) {
      return res.status(404).json({ message: "Environment not found" });
    }

    environment.team = environment.team.filter(
      (member) => member.toString() !== userId,
    );
    await environment.save();

    await environment.populate("team", "username email firstName lastName");

    res.json({
      message: "Team member removed successfully",
      team: environment.team,
    });
  } catch (error) {
    console.error("Remove team member error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
