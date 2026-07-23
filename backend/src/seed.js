const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Vehicle = require('./models/Vehicle');

dotenv.config({ path: path.join(__dirname, '../.env') });

const vehicles = [
  {
    make: 'Chevrolet',
    model: 'Corvette Stingray Z06',
    category: 'Coupe',
    price: 19999000,
    quantity: 3,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    mileage: '12,000 km',
    description: 'High-performance V8 sports coupe with Track package and aerodynamic styling.',
    images: ['https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&auto=format&fit=crop']
  },
  {
    make: 'Mercedes-Benz',
    model: 'GLE Coupe 43 AMG',
    category: 'SUV',
    price: 11500000,
    quantity: 4,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    mileage: '18,500 km',
    description: 'Luxury coupe SUV with AMG performance exhaust and panoramic roof.',
    images: ['https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&auto=format&fit=crop']
  },
  {
    make: 'Porsche',
    model: 'Taycan Turbo S',
    category: 'Sedan',
    price: 22500000,
    quantity: 2,
    fuelType: 'Electric',
    transmission: 'Automatic',
    mileage: '8,200 km',
    description: 'All-electric flagship supercar sedan delivering blistering acceleration.',
    images: ['https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop']
  },
  {
    make: 'BMW',
    model: 'M4 Competition xDrive',
    category: 'Coupe',
    price: 15300000,
    quantity: 5,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    mileage: '10,000 km',
    description: 'Twin-turbo inline-6 sports coupe tuned for track performance.',
    images: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop']
  },
  {
    make: 'Audi',
    model: 'Q7 Quattro RS',
    category: 'SUV',
    price: 9450000,
    quantity: 6,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    mileage: '24,000 km',
    description: '7-seater luxury SUV with legendary Quattro all-wheel drive stability.',
    images: ['https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop']
  },
  {
    make: 'Ford',
    model: 'Mustang GT V8',
    category: 'Coupe',
    price: 8900000,
    quantity: 3,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    mileage: '15,000 km',
    description: 'Iconic American muscle car powered by a naturally aspirated 5.0L V8.',
    images: ['https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=800&auto=format&fit=crop']
  },
  {
    make: 'Land Rover',
    model: 'Range Rover Velar',
    category: 'SUV',
    price: 8990000,
    quantity: 4,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    mileage: '21,000 km',
    description: 'Sleek luxury SUV featuring flush door handles and Meridian sound.',
    images: ['https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&auto=format&fit=crop']
  },
  {
    make: 'Toyota',
    model: 'Fortuner Legender 4x4',
    category: 'SUV',
    price: 4650000,
    quantity: 8,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    mileage: '28,000 km',
    description: 'Robust 7-seater SUV built for rugged terrain and premium highway cruising.',
    images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop']
  },
  {
    make: 'Mahindra',
    model: 'Thar LX 4x4 Hardtop',
    category: 'SUV',
    price: 1825000,
    quantity: 10,
    fuelType: 'Diesel',
    transmission: 'Manual',
    mileage: '19,000 km',
    description: 'Iconic off-roader with removable roof panels and low-range 4x4 gearbox.',
    images: ['https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&auto=format&fit=crop']
  },
  {
    make: 'Hyundai',
    model: 'Creta SX (O) Turbo',
    category: 'SUV',
    price: 1980000,
    quantity: 12,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    mileage: '14,000 km',
    description: 'Feature-loaded compact SUV with panoramic sunroof and ADAS safety suite.',
    images: ['https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&auto=format&fit=crop']
  },
  {
    make: 'Honda',
    model: 'City ZX i-VTEC',
    category: 'Sedan',
    price: 1695000,
    quantity: 7,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    mileage: '22,000 km',
    description: 'Premium executive sedan offering class-leading rear legroom and efficiency.',
    images: ['https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=800&auto=format&fit=crop']
  },
  {
    make: 'Lamborghini',
    model: 'Huracán EVO Spyder',
    category: 'Coupe',
    price: 37500000,
    quantity: 1,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    mileage: '4,500 km',
    description: 'V10 mid-engine convertible supercar producing pure unadulterated exhaust notes.',
    images: ['https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&auto=format&fit=crop']
  },
  {
    make: 'Jaguar',
    model: 'F-Type R-Dynamic',
    category: 'Coupe',
    price: 14500000,
    quantity: 2,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    mileage: '9,800 km',
    description: 'British sports car crafted with lightweight aluminum body and active exhaust.',
    images: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop']
  },
  {
    make: 'Tesla',
    model: 'Model S Plaid',
    category: 'Electric',
    price: 17500000,
    quantity: 3,
    fuelType: 'Electric',
    transmission: 'Automatic',
    mileage: '6,000 km',
    description: 'Tri-motor electric sedan producing over 1,000 horsepower and sub-2s 0-60 acceleration.',
    images: ['https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop']
  }
];

const seedDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/car_dealership';
    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected for Seeding...');

    await Vehicle.deleteMany({});
    console.log('Cleared existing vehicle collection.');

    await Vehicle.insertMany(vehicles);
    console.log('Successfully seeded 14 vehicles with exact model images!');

    process.exit();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDB();
