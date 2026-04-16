const User = require("../models/User");

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { name, email, autoDeploy, emailAlerts, securityNotifications } =
      req.body;

    if (name) user.name = name;
    if (email) user.email = email;
    if (typeof autoDeploy === "boolean") user.autoDeploy = autoDeploy;
    if (typeof emailAlerts === "boolean") user.emailAlerts = emailAlerts;
    if (typeof securityNotifications === "boolean")
      user.securityNotifications = securityNotifications;

    await user.save();

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      autoDeploy: user.autoDeploy,
      emailAlerts: user.emailAlerts,
      securityNotifications: user.securityNotifications,
    });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getUserProfile, updateUserProfile };
