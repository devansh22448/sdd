const Footer = require("../models/Footer");
const breaker = require("../services/circuitBreaker");

// @desc Get active footer
exports.getActiveFooter = async (req, res) => {
  try {
    const footer = await breaker.fire(async () => {
      return await Footer.getActiveFooter();
    });

    if (!footer) {
      return res.status(200).json({
        success: true,
        data: {
          contactEmail: "support@smartdevops.com",
          contactPhone: "+1 234 567 890",
          address: "San Francisco, CA",
          description:
            "Smart DevOps Dashboard - Monitor your deployments, logs, metrics, and infrastructure in real-time.",
          socialLinks: {
            linkedin: "https://linkedin.com",
            github: "https://github.com",
            twitter: "https://twitter.com",
            youtube: "https://youtube.com",
          },
          quickLinks: [
            { label: "Dashboard", path: "/dashboard" },
            { label: "Logs", path: "/logs" },
            { label: "Deployments", path: "/deployments" },
            { label: "Settings", path: "/settings" },
          ],
          isActive: true,
        },
      });
    }

    res.status(200).json({
      success: true,
      data: footer,
    });
  } catch (error) {
    console.error("Error fetching footer:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Create footer
exports.createFooter = async (req, res) => {
  try {
    const result = await breaker.fire(async () => {
      const {
        contactEmail,
        contactPhone,
        address,
        description,
        socialLinks,
        quickLinks,
        isActive,
      } = req.body;

      const existingActive = await Footer.findOne({ isActive: true });

      if (isActive && existingActive) {
        await Footer.findByIdAndUpdate(existingActive._id, {
          isActive: false,
        });
      }

      const footer = await Footer.create({
        contactEmail,
        contactPhone,
        address,
        description,
        socialLinks,
        quickLinks: quickLinks || [
          { label: "Dashboard", path: "/dashboard" },
          { label: "Logs", path: "/logs" },
          { label: "Deployments", path: "/deployments" },
          { label: "Settings", path: "/settings" },
        ],
        isActive: isActive !== undefined ? isActive : true,
      });

      return footer;
    });

    res.status(201).json({
      success: true,
      message: "Footer created successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error creating footer:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Update footer
exports.updateFooter = async (req, res) => {
  try {
    const result = await breaker.fire(async () => {
      const { id } = req.params;
      const {
        contactEmail,
        contactPhone,
        address,
        description,
        socialLinks,
        quickLinks,
        isActive,
      } = req.body;

      let footer = await Footer.findById(id);
      if (!footer) throw new Error("Footer not found");

      if (isActive && !footer.isActive) {
        await Footer.updateMany(
          { _id: { $ne: id }, isActive: true },
          { isActive: false },
        );
      }

      footer = await Footer.findByIdAndUpdate(
        id,
        {
          contactEmail,
          contactPhone,
          address,
          description,
          socialLinks,
          quickLinks,
          isActive,
        },
        { new: true, runValidators: true },
      );

      return footer;
    });

    res.status(200).json({
      success: true,
      message: "Footer updated successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error updating footer:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Delete footer
exports.deleteFooter = async (req, res) => {
  try {
    await breaker.fire(async () => {
      const { id } = req.params;

      const footer = await Footer.findById(id);
      if (!footer) throw new Error("Footer not found");

      await Footer.findByIdAndDelete(id);
    });

    res.status(200).json({
      success: true,
      message: "Footer deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting footer:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Get all footers
exports.getAllFooters = async (req, res) => {
  try {
    const footers = await breaker.fire(async () => {
      return await Footer.find().sort({ createdAt: -1 });
    });

    res.status(200).json({
      success: true,
      data: footers,
    });
  } catch (error) {
    console.error("Error fetching all footers:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Get footer by ID
exports.getFooterById = async (req, res) => {
  try {
    const footer = await breaker.fire(async () => {
      return await Footer.findById(req.params.id);
    });

    if (!footer) {
      return res.status(404).json({
        success: false,
        message: "Footer not found",
      });
    }

    res.status(200).json({
      success: true,
      data: footer,
    });
  } catch (error) {
    console.error("Error fetching footer by ID:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
