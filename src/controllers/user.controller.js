const bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.user;

// Get all users
exports.findAll = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: [
        "id",
        "email",
        "firstName",
        "lastName",
        "createdAt",
        "updatedAt",
      ],
    });
    console.log(users);
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving users.",
    });
  }
};

// Get user by ID
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id, {
      attributes: [
        "id",
        "email",
        "firstName",
        "lastName",
        "createdAt",
        "updatedAt",
      ],
    });

    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({
        message: `User with id=${id} not found.`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error retrieving User with id=" + req.params.id,
    });
  }
};

// Update user
exports.update = async (req, res) => {
  try {
    const id = req.params.id;

    // Check if user exists
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send({
        message: `User with id=${id} not found.`,
      });
    }

    // Users can only update their own records
    if (id !== req.userId) {
      return res.status(403).send({
        message: "You can only update your own user information!",
      });
    }

    // Prepare update data
    const updateData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    };

    // Update password if provided
    if (req.body.password) {
      updateData.password = bcrypt.hashSync(req.body.password, 8);
    }

    // Update user
    await User.update(updateData, {
      where: { id: id },
    });

    res.status(200).send({
      message: "User was updated successfully.",
    });
  } catch (error) {
    res.status(500).send({
      message: "Error updating User with id=" + req.params.id,
    });
  }
};

// Delete user
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    // Prevent users from deleting themselves
    if (id === req.userId) {
      return res.status(400).send({
        message: "You cannot delete your own account!",
      });
    }

    // Check if target user exists
    const targetUser = await User.findByPk(id);
    if (!targetUser) {
      return res.status(404).send({
        message: `User with id=${id} not found.`,
      });
    }

    // Delete user
    await User.destroy({
      where: { id: id },
    });

    res.status(200).send({
      message: "User was deleted successfully!",
    });
  } catch (error) {
    res.status(500).send({
      message: "Could not delete User with id=" + req.params.id,
    });
  }
};
