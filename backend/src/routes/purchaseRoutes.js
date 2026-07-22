const express = require('express');
const router = express.Router();
const {
  getAllPurchases,
  getMyPurchases,
  getPurchaseStats,
} = require('../controllers/purchaseController');
const verifyToken = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/adminMiddleware');

router.get('/stats', verifyToken, isAdmin, getPurchaseStats);
router.get('/my', verifyToken, getMyPurchases);
router.get('/', verifyToken, isAdmin, getAllPurchases);

module.exports = router;