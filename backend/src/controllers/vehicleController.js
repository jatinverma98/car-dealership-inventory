const Vehicle = require('../models/Vehicle');
const Purchase = require('../models/Purchase');

// POST /api/vehicles
const addVehicle = async (req, res) => {
  try {
    const { make, model, category, price, quantity, description } = req.body;

    if (!make || !model || !category || price === undefined) {
      return res.status(400).json({ message: 'Please fill required fields' });
    }

    const images = req.files
      ? req.files.map((f) => `/uploads/${f.filename}`)
      : [];

    const vehicle = await Vehicle.create({
      make,
      model,
      category,
      price,
      quantity: quantity || 0,
      description,
      images,
    });

    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/vehicles
const getVehicles = async (req, res) => {
  try {
    let vehicles = await Vehicle.find();
    if (!vehicles || vehicles.length === 0) {
      const initialVehicles = [
        { make: 'Chevrolet', model: 'Corvette Stingray Z06', category: 'Coupe', price: 19999000, quantity: 3, fuelType: 'Petrol', transmission: 'Automatic', mileage: '12,000 km', description: 'High-performance V8 sports coupe.', images: [] },
        { make: 'Mercedes-Benz', model: 'GLE Coupe 43 AMG', category: 'SUV', price: 11500000, quantity: 4, fuelType: 'Petrol', transmission: 'Automatic', mileage: '18,500 km', description: 'Luxury coupe SUV.', images: [] },
        { make: 'Porsche', model: 'Taycan Turbo S', category: 'Sedan', price: 22500000, quantity: 2, fuelType: 'Electric', transmission: 'Automatic', mileage: '8,200 km', description: 'All-electric flagship supercar.', images: [] },
        { make: 'BMW', model: 'M4 Competition xDrive', category: 'Coupe', price: 15300000, quantity: 5, fuelType: 'Petrol', transmission: 'Automatic', mileage: '10,000 km', description: 'Twin-turbo inline-6 sports coupe.', images: [] },
        { make: 'Audi', model: 'Q7 Quattro RS', category: 'SUV', price: 9450000, quantity: 6, fuelType: 'Diesel', transmission: 'Automatic', mileage: '24,000 km', description: '7-seater luxury SUV.', images: [] },
        { make: 'Ford', model: 'Mustang GT V8', category: 'Coupe', price: 8900000, quantity: 3, fuelType: 'Petrol', transmission: 'Automatic', mileage: '15,000 km', description: 'Iconic American muscle car.', images: [] },
        { make: 'Land Rover', model: 'Range Rover Velar', category: 'SUV', price: 8990000, quantity: 4, fuelType: 'Diesel', transmission: 'Automatic', mileage: '21,000 km', description: 'Sleek luxury SUV.', images: [] },
        { make: 'Toyota', model: 'Fortuner Legender 4x4', category: 'SUV', price: 4650000, quantity: 8, fuelType: 'Diesel', transmission: 'Automatic', mileage: '28,000 km', description: 'Robust 7-seater SUV.', images: [] },
        { make: 'Mahindra', model: 'Thar LX 4x4 Hardtop', category: 'SUV', price: 1825000, quantity: 10, fuelType: 'Diesel', transmission: 'Manual', mileage: '19,000 km', description: 'Iconic off-roader.', images: [] },
        { make: 'Hyundai', model: 'Creta SX (O) Turbo', category: 'SUV', price: 1980000, quantity: 12, fuelType: 'Petrol', transmission: 'Automatic', mileage: '14,000 km', description: 'Feature-loaded compact SUV.', images: [] },
        { make: 'Honda', model: 'City ZX i-VTEC', category: 'Sedan', price: 1695000, quantity: 7, fuelType: 'Petrol', transmission: 'Automatic', mileage: '22,000 km', description: 'Executive sedan.', images: [] },
        { make: 'Lamborghini', model: 'Huracán EVO Spyder', category: 'Coupe', price: 37500000, quantity: 1, fuelType: 'Petrol', transmission: 'Automatic', mileage: '4,500 km', description: 'V10 mid-engine convertible supercar.', images: [] },
        { make: 'Jaguar', model: 'F-Type R-Dynamic', category: 'Coupe', price: 14500000, quantity: 2, fuelType: 'Petrol', transmission: 'Automatic', mileage: '9,800 km', description: 'British sports car.', images: [] },
        { make: 'Tesla', model: 'Model S Plaid', category: 'Electric', price: 17500000, quantity: 3, fuelType: 'Electric', transmission: 'Automatic', mileage: '6,000 km', description: 'Tri-motor electric sedan.', images: [] }
      ];
      await Vehicle.insertMany(initialVehicles);
      vehicles = await Vehicle.find();
    }
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/vehicles/:id
const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/vehicles/search
const searchVehicles = async (req, res) => {
  try {
    const { make, model, category, minPrice, maxPrice } = req.query;
    const filter = {};

    if (make) filter.make = make;
    if (model) filter.model = model;
    if (category) filter.category = category;

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const vehicles = await Vehicle.find(filter);
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/vehicles/:id
const updateVehicle = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map((f) => `/uploads/${f.filename}`);
    }

    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/vehicles/:id (admin only)
const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    res.status(200).json({ message: 'Vehicle deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/vehicles/:id/purchase
const purchaseVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    if (vehicle.quantity <= 0) {
      return res.status(400).json({ message: 'Vehicle is out of stock' });
    }

    vehicle.quantity -= 1;
    await vehicle.save();

    // save purchase record
    await Purchase.create({
      vehicle: vehicle._id,
      user: req.user.id,
      make: vehicle.make,
      model: vehicle.model,
      price: vehicle.price,
    });

    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/vehicles/:id/restock (admin only)
const restockVehicle = async (req, res) => {
  try {
    const { amount } = req.body;
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    vehicle.quantity += amount || 1;
    await vehicle.save();

    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addVehicle,
  getVehicles,
  getVehicleById,
  searchVehicles,
  updateVehicle,
  deleteVehicle,
  purchaseVehicle,
  restockVehicle,
};