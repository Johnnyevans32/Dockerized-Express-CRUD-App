const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;

// Register a new user
exports.register = async (req, res) => {
  try {
    // Create user object
    const user = {
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };

    // Save user to database
    const createdUser = await User.create(user);

    res.status(201).send({
      message: "User was registered successfully!",
      user: {
        id: createdUser.id,
        email: createdUser.email,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
      },
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// User login
exports.login = async (req, res) => {
  try {
    // Find user by email
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    // Validate password
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid password!",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: 86400 } // 24 hours
    );

    res.status(200).send({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      accessToken: token,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
