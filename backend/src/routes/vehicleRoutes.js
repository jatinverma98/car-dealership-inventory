const express = require('express');
const router = express.Router();
const {
  addVehicle,
  getVehicles,
  getVehicleById,
  searchVehicles,
  updateVehicle,
  deleteVehicle,
  purchaseVehicle,
  restockVehicle,
} = require('../controllers/vehicleController')
const verifyToken = require('../middleware/authMiddleware')
const isAdmin = require('../middleware/adminMiddleware')

router.get('/search', verifyToken, searchVehicles)
router.get('/', verifyToken, getVehicles)
router.get('/:id', verifyToken, getVehicleById)
router.post('/', verifyToken, isAdmin, addVehicle)
router.put('/:id', verifyToken, isAdmin, updateVehicle)
router.delete('/:id', verifyToken, isAdmin, deleteVehicle)
router.post('/:id/purchase', verifyToken, purchaseVehicle)
router.post('/:id/restock', verifyToken, isAdmin, restockVehicle)
module.exports = router;