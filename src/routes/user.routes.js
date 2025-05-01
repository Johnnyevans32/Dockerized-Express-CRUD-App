const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const verifyToken = require('../middleware/auth');

// Apply authentication middleware to all user routes
router.use(verifyToken);

// Get all users
router.get('/', userController.findAll);

// Get user by ID
router.get('/:id', userController.findOne);

// Update user
router.put('/:id', userController.update);

// Delete user
router.delete('/:id', userController.delete);

module.exports = router; 