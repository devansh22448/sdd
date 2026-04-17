const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const breaker = require("../services/circuitBreaker");

const tokenSigner = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "defaultsecret", {
    expiresIn: "7d",
  });
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide name, email and password." });
    }

    const existingUser = await breaker.fire(() => User.findOne({ email }));
    if (existingUser && existingUser.success === false) {
      return res.status(503).json(existingUser);
    }

    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await breaker.fire(() =>
      User.create({ name, email, password: hashedPassword }),
    );

    if (user.success === false) {
      return res.status(503).json(user);
    }

    res.status(201).json({
      token: tokenSigner(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        autoDeploy: user.autoDeploy,
        emailAlerts: user.emailAlerts,
        securityNotifications: user.securityNotifications,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password." });
    }

    const user = await breaker.fire(() => User.findOne({ email }));

    if (!user || user.success === false) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    res.json({
      token: tokenSigner(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        autoDeploy: user.autoDeploy,
        emailAlerts: user.emailAlerts,
        securityNotifications: user.securityNotifications,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { register, login };
