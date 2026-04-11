const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("../config");
const circuitBreaker = require("../services/circuitBreaker");

// Register new user
exports.register = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;

    // Check if user already exists
    const existingUser = await circuitBreaker.fire(() =>
      User.findOne({
        $or: [{ email }, { username }],
      }),
    );

    if (existingUser) {
      return res.status(400).json({
        message: "User with this email or username already exists",
      });
    }

    // Create new user
    const user = new User({
      username,
      email,
      password,
      firstName,
      lastName,
    });

    await circuitBreaker.fire(() => user.save());

    const token = user.generateToken();

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: user.toJSON(),
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error or DB unavailable" });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await circuitBreaker.fire(() => User.findOne({ email }));

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: "Account is deactivated" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    user.lastLogin = new Date();

    await circuitBreaker.fire(() => user.save());

    const token = user.generateToken();

    res.json({
      message: "Login successful",
      token,
      user: user.toJSON(),
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error or DB unavailable" });
  }
};

// Get current user
exports.getMe = async (req, res) => {
  try {
    const user = await circuitBreaker.fire(() => User.findById(req.user.id));

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.toJSON());
  } catch (error) {
    console.error("Get me error:", error);
    res.status(500).json({ message: "Server error or DB unavailable" });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, preferences } = req.body;

    const user = await circuitBreaker.fire(() => User.findById(req.user.id));

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (preferences) user.preferences = { ...user.preferences, ...preferences };

    await circuitBreaker.fire(() => user.save());

    res.json(user.toJSON());
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error or DB unavailable" });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await circuitBreaker.fire(() => User.findById(req.user.id));

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    user.password = newPassword;

    await circuitBreaker.fire(() => user.save());

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ message: "Server error or DB unavailable" });
  }
};

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await circuitBreaker.fire(() =>
      User.find().select("-password"),
    );

    res.json(users);
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({ message: "Server error or DB unavailable" });
  }
};
