const { runDeploymentProcess } = require("../services/runnerService");
const Deployment = require("../models/Deployment");
const breaker = require("../services/circuitBreaker");

// 1. Get all deployments (Feeds your Deployments Table)
const getDeployments = async (req, res) => {
  try {
    const deployments = await breaker.fire(() =>
      Deployment.find().sort({ createdAt: -1 }),
    );

    if (deployments.success === false) {
      return res.status(503).json(deployments);
    }

    res.status(200).json(deployments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Create a new deployment (Triggered by "+ New Deployment" button)
const createDeployment = async (req, res) => {
  try {
    const { project, environment, version } = req.body;

    const deployment = await breaker.fire(() =>
      Deployment.create({
        project: project || "Unknown Project",
        environment: environment || "Production",
        version: version || "latest",
        status: "Pending",
        startedAt: new Date(),
      }),
    );

    if (deployment.success === false) {
      return res.status(503).json(deployment);
    }
    // JAADU YAHAN HAI: Background mein terminal commands chalana shuru kardo, HTTP response return karne ka wait mat karo
    runDeploymentProcess(deployment._id);

    res.status(201).json(deployment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const triggerDeployment = async (req, res) => {
  try {
    const { repoUrl, branch, environment, deployMessage } = req.body;

    // Circuit breaker: limit concurrent deployments to 3
    const runningCount = await breaker.fire(() =>
      Deployment.countDocuments({ status: "Running" }),
    );

    if (runningCount >= 3) {
      return res.status(429).json({
        message: "Circuit breaker: Max 3 deployments running",
      });
    }

    const projectName = repoUrl
      ? repoUrl.split("/").pop().replace(".git", "")
      : "Unknown Project";

    const deployment = await breaker.fire(() =>
      Deployment.create({
        project: projectName,
        repoUrl,
        branch: branch || "main",
        environment: environment || "development",
        deployMessage,
        status: "Pending",
        startedAt: new Date(),
      }),
    );

    if (deployment.success === false) {
      return res.status(503).json(deployment);
    }

    // Assuming dummy owner and repoName for runDeploymentProcess based on Github repo string
    // Assuming cloneUrl is repoUrl
    const parts = repoUrl
      ? repoUrl.replace("https://github.com/", "").split("/")
      : [];
    const owner = parts[0] || "owner";
    const repoName = parts[1]?.replace(".git", "") || "repo";

    runDeploymentProcess(deployment._id, owner, repoName, "123456", repoUrl);

    res.status(201).json(deployment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 3. Get Dashboard Metrics
const getDashboardMetrics = async (req, res) => {
  try {
    const totalDeployments = await breaker.fire(() =>
      Deployment.countDocuments(),
    );

    const successCount = await breaker.fire(() =>
      Deployment.countDocuments({ status: "Success" }),
    );

    const failureCount = await breaker.fire(() =>
      Deployment.countDocuments({ status: "Failed" }),
    );

    const activeDeployments = await breaker.fire(() =>
      Deployment.countDocuments({
        status: { $in: ["Pending", "Running"] },
      }),
    );

    // Handle fallback case
    if (
      totalDeployments?.success === false ||
      successCount?.success === false ||
      failureCount?.success === false ||
      activeDeployments?.success === false
    ) {
      return res.status(503).json({
        message: "Metrics service temporarily unavailable",
      });
    }

    const successRate =
      totalDeployments === 0
        ? 0
        : Math.round((successCount / totalDeployments) * 100);

    // 🔥 Get completed deployments
    const completed = await breaker.fire(() =>
      Deployment.find({
        status: { $in: ["Success", "Failed"] },
      }),
    );

    if (completed?.success === false) {
      return res.status(503).json(completed);
    }

    let totalSecs = 0;
    let validDurations = 0;
    let envStats = {};

    completed.forEach((d) => {
      const env = d.environment || "production";

      if (!envStats[env]) {
        envStats[env] = {
          count: 0,
          totalDuration: 0,
          validItems: 0,
        };
      }

      envStats[env].count += 1;

      if (d.duration && d.duration.endsWith("s")) {
        const secs = parseInt(d.duration.replace("s", ""));
        if (!isNaN(secs)) {
          totalSecs += secs;
          validDurations += 1;
          envStats[env].totalDuration += secs;
          envStats[env].validItems += 1;
        }
      }
    });

    const avgDurationMs =
      validDurations > 0 ? Math.round((totalSecs / validDurations) * 1000) : 0;

    const deploymentsByEnvironment = Object.keys(envStats).map((env) => ({
      name: env,
      count: envStats[env].count,
    }));

    const avgDurationByEnvironment = Object.keys(envStats).map((env) => ({
      name: env,
      duration:
        envStats[env].validItems > 0
          ? Math.round(envStats[env].totalDuration / envStats[env].validItems)
          : 0,
    }));

    // 🔥 Last 30 days data
    const deploymentsByDay = [];

    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);

      const dateStr = d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      const startOfDay = new Date(d.setHours(0, 0, 0, 0));
      const endOfDay = new Date(d.setHours(23, 59, 59, 999));

      const dayCount = await breaker.fire(() =>
        Deployment.countDocuments({
          createdAt: { $gte: startOfDay, $lte: endOfDay },
        }),
      );

      // Handle fallback per day
      if (dayCount?.success === false) {
        deploymentsByDay.push({
          name: dateStr,
          deployments: 0,
        });
      } else {
        deploymentsByDay.push({
          name: dateStr,
          deployments: dayCount,
        });
      }
    }

    res.json({
      totalDeployments,
      successCount,
      failureCount,
      successRate,
      avgDurationMs,
      activeDeployments,
      deploymentsByDay,
      deploymentsByEnvironment,
      avgDurationByEnvironment,
      statusBreakdown: [
        { name: "Success", value: successCount },
        { name: "Failed", value: failureCount },
        { name: "Pending/Running", value: activeDeployments },
      ],
    });
  } catch (error) {
    console.error("Metrics Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getDeployments,
  createDeployment,
  triggerDeployment,
  getDashboardMetrics,
};
