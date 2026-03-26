import Footer from "../models/Footer.js";

// @desc    Get active footer data
// @route   GET /api/footer
// @access  Public
export const getActiveFooter = async (req, res) => {
  try {
    const footer = await Footer.getActiveFooter();

    if (!footer) {
      // Return default fallback data if no footer exists
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
      message: "Server error fetching footer data",
    });
  }
};

// @desc    Create new footer
// @route   POST /api/footer
// @access  Private (Admin)
export const createFooter = async (req, res) => {
  try {
    const {
      contactEmail,
      contactPhone,
      address,
      description,
      socialLinks,
      quickLinks,
      isActive,
    } = req.body;

    // Check if active footer already exists
    const existingActive = await Footer.findOne({ isActive: true });

    // If creating new active footer, deactivate existing one
    if (isActive && existingActive) {
      await Footer.findByIdAndUpdate(existingActive._id, { isActive: false });
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

    res.status(201).json({
      success: true,
      message: "Footer created successfully",
      data: footer,
    });
  } catch (error) {
    console.error("Error creating footer:", error);
    res.status(500).json({
      success: false,
      message: "Server error creating footer",
    });
  }
};

// @desc    Update footer
// @route   PUT /api/footer/:id
// @access  Private (Admin)
export const updateFooter = async (req, res) => {
  try {
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

    if (!footer) {
      return res.status(404).json({
        success: false,
        message: "Footer not found",
      });
    }

    // If setting to active, deactivate other active footers
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

    res.status(200).json({
      success: true,
      message: "Footer updated successfully",
      data: footer,
    });
  } catch (error) {
    console.error("Error updating footer:", error);
    res.status(500).json({
      success: false,
      message: "Server error updating footer",
    });
  }
};

// @desc    Delete footer
// @route   DELETE /api/footer/:id
// @access  Private (Admin)
export const deleteFooter = async (req, res) => {
  try {
    const { id } = req.params;

    const footer = await Footer.findById(id);

    if (!footer) {
      return res.status(404).json({
        success: false,
        message: "Footer not found",
      });
    }

    await Footer.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Footer deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting footer:", error);
    res.status(500).json({
      success: false,
      message: "Server error deleting footer",
    });
  }
};

// @desc    Get all footers (for admin)
// @route   GET /api/footer/all
// @access  Private (Admin)
export const getAllFooters = async (req, res) => {
  try {
    const footers = await Footer.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: footers,
    });
  } catch (error) {
    console.error("Error fetching all footers:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching footers",
    });
  }
};

// @desc    Get footer by ID (for admin editing)
// @route   GET /api/footer/:id
// @access  Private (Admin)
export const getFooterById = async (req, res) => {
  try {
    const { id } = req.params;

    const footer = await Footer.findById(id);

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
      message: "Server error fetching footer",
    });
  }
};
