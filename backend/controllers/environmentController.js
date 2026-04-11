const Environment = require("../models/Environment");
const Deployment = require("../models/Deployment");
const breaker = require("../services/circuitBreaker");

// Get all environments
exports.getAllEnvironments = async (req, res) => {
  try {
    const environments = await breaker.fire(async () => {
      return await Environment.find()
        .populate("owner", "username email firstName lastName")
        .populate("team", "username email firstName lastName")
        .populate("lastDeployment");
    });

    res.json(environments);
  } catch (error) {
    console.error("Get environments error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get environment by ID
exports.getEnvironmentById = async (req, res) => {
  try {
    const environment = await breaker.fire(async () => {
      return await Environment.findById(req.params.id)
        .populate("owner", "username email firstName lastName")
        .populate("team", "username email firstName lastName")
        .populate("lastDeployment");
    });

    if (!environment) {
      return res.status(404).json({ message: "Environment not found" });
    }

    res.json(environment);
  } catch (error) {
    console.error("Get environment error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Create new environment
exports.createEnvironment = async (req, res) => {
  try {
    const { name, type, description, config, healthCheck, resources } =
      req.body;

    const environment = await breaker.fire(async () => {
      const existingEnv = await Environment.findOne({ name });
      if (existingEnv) {
        throw new Error("Environment with this name already exists");
      }

      const env = new Environment({
        name,
        type,
        description,
        config,
        healthCheck,
        resources,
        owner: req.user.id,
      });

      await env.save();
      await env.populate("owner", "username email firstName lastName");

      return env;
    });

    res.status(201).json({
      message: "Environment created successfully",
      environment,
    });
  } catch (error) {
    console.error("Create environment error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Update environment
exports.updateEnvironment = async (req, res) => {
  try {
    const environment = await breaker.fire(async () => {
      const {
        name,
        description,
        status,
        config,
        healthCheck,
        resources,
        team,
      } = req.body;

      const env = await Environment.findById(req.params.id);
      if (!env) throw new Error("Environment not found");

      if (name && name !== env.name) {
        const existingEnv = await Environment.findOne({ name });
        if (existingEnv) {
          throw new Error("Environment with this name already exists");
        }
      }

      if (name) env.name = name;
      if (description) env.description = description;
      if (status) env.status = status;
      if (config) env.config = { ...env.config.toObject(), ...config };
      if (healthCheck) env.healthCheck = { ...env.healthCheck, ...healthCheck };
      if (resources) env.resources = resources;
      if (team) env.team = team;

      await env.save();
      await env.populate("owner", "username email firstName lastName");
      await env.populate("team", "username email firstName lastName");

      return env;
    });

    res.json({
      message: "Environment updated successfully",
      environment,
    });
  } catch (error) {
    console.error("Update environment error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Delete environment
exports.deleteEnvironment = async (req, res) => {
  try {
    await breaker.fire(async () => {
      const environment = await Environment.findById(req.params.id);
      if (!environment) throw new Error("Environment not found");

      const activeDeployments = await Deployment.countDocuments({
        environment: environment.name,
        status: { $in: ["pending", "in_progress"] },
      });

      if (activeDeployments > 0) {
        throw new Error("Cannot delete environment with active deployments");
      }

      await environment.deleteOne();
    });

    res.json({ message: "Environment deleted successfully" });
  } catch (error) {
    console.error("Delete environment error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get environment health status
exports.getEnvironmentHealth = async (req, res) => {
  try {
    const healthStatuses = await breaker.fire(async () => {
      const environments = await Environment.find({ status: "active" });

      return await Promise.all(
        environments.map(async (env) => {
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
    });

    res.json(healthStatuses);
  } catch (error) {
    console.error("Get environment health error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Add team member
exports.addTeamMember = async (req, res) => {
  try {
    const result = await breaker.fire(async () => {
      const { userId } = req.body;

      const environment = await Environment.findById(req.params.id);
      if (!environment) throw new Error("Environment not found");

      if (!environment.team.includes(userId)) {
        environment.team.push(userId);
        await environment.save();
      }

      await environment.populate("team", "username email firstName lastName");

      return environment.team;
    });

    res.json({
      message: "Team member added successfully",
      team: result,
    });
  } catch (error) {
    console.error("Add team member error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Remove team member
exports.removeTeamMember = async (req, res) => {
  try {
    const result = await breaker.fire(async () => {
      const { userId } = req.params;

      const environment = await Environment.findById(req.params.id);
      if (!environment) throw new Error("Environment not found");

      environment.team = environment.team.filter(
        (member) => member.toString() !== userId,
      );

      await environment.save();

      await environment.populate("team", "username email firstName lastName");

      return environment.team;
    });

    res.json({
      message: "Team member removed successfully",
      team: result,
    });
  } catch (error) {
    console.error("Remove team member error:", error);
    res.status(500).json({ message: error.message });
  }
};
