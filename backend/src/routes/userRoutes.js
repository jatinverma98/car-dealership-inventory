const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getProfile,
  updateProfile,
  deleteUser,
  updateUserRole,
} = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/adminMiddleware');

// profile routes (any logged in user)
router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, updateProfile);

// admin only routes
router.get('/', verifyToken, isAdmin, getAllUsers);
router.delete('/:id', verifyToken, isAdmin, deleteUser);
router.put('/:id/role', verifyToken, isAdmin, updateUserRole);

module.exports = router;