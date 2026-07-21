const request = require('supertest');
const app = require('../src/app');
const { connect, closeDatabase, clearDatabase } = require('./setup');

let userToken;
let adminToken;
let vehicleId;

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

// helper to register and login a user and get token back
const loginAs = async (role) => {
  const email = `${role}@test.com`;

  await request(app).post('/api/auth/register').send({
    name: role,
    email,
    password: 'password123',
  });

  // manually set role to admin in db if needed
  if (role === 'admin') {
    const User = require('../src/models/User');
    await User.findOneAndUpdate({ email }, { role: 'admin' });
  }

  const res = await request(app).post('/api/auth/login').send({
    email,
    password: 'password123',
  });

  return res.body.token;
};

beforeEach(async () => {
  userToken = await loginAs('user');
  adminToken = await loginAs('admin');
});

// ─── MIDDLEWARE TESTS ───────────────────────────────────────────────

describe('Auth Middleware', () => {
  it('should block request with no token', async () => {
    const res = await request(app).get('/api/vehicles');
    expect(res.statusCode).toBe(401);
  });

  it('should block request with invalid token', async () => {
    const res = await request(app)
      .get('/api/vehicles')
      .set('Authorization', 'Bearer invalidtoken123');
    expect(res.statusCode).toBe(401);
  });

  it('should allow request with valid token', async () => {
    const res = await request(app)
      .get('/api/vehicles')
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.statusCode).toBe(200);
  });
});

describe('Admin Middleware', () => {
  it('should block non-admin from deleting a vehicle', async () => {
    // first create a vehicle as admin
    const created = await request(app)
      .post('/api/vehicles')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        make: 'Toyota',
        model: 'Fortuner',
        category: 'SUV',
        price: 3250000,
        quantity: 3,
      });

    const res = await request(app)
      .delete(`/api/vehicles/${created.body._id}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toBe(403);
  });

  it('should allow admin to delete a vehicle', async () => {
    const created = await request(app)
      .post('/api/vehicles')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        make: 'Toyota',
        model: 'Fortuner',
        category: 'SUV',
        price: 3250000,
        quantity: 3,
      });

    const res = await request(app)
      .delete(`/api/vehicles/${created.body._id}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
  });
});

// ─── VEHICLE CRUD TESTS ─────────────────────────────────────────────

describe('POST /api/vehicles', () => {
  it('should add a new vehicle as admin', async () => {
    const res = await request(app)
      .post('/api/vehicles')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        make: 'Honda',
        model: 'City',
        category: 'Sedan',
        price: 1320000,
        quantity: 5,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.make).toBe('Honda');
  });

  it('should not add vehicle with missing fields', async () => {
    const res = await request(app)
      .post('/api/vehicles')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ make: 'Honda' });

    expect(res.statusCode).toBe(400);
  });
});

describe('GET /api/vehicles', () => {
  it('should return list of all vehicles', async () => {
    await request(app)
      .post('/api/vehicles')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        make: 'Honda',
        model: 'City',
        category: 'Sedan',
        price: 1320000,
        quantity: 5,
      });

    const res = await request(app)
      .get('/api/vehicles')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });
});

describe('GET /api/vehicles/search', () => {
  beforeEach(async () => {
    await request(app)
      .post('/api/vehicles')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        make: 'Toyota',
        model: 'Fortuner',
        category: 'SUV',
        price: 3250000,
        quantity: 3,
      });

    await request(app)
      .post('/api/vehicles')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        make: 'Honda',
        model: 'City',
        category: 'Sedan',
        price: 1320000,
        quantity: 5,
      });
  });

  it('should filter by make', async () => {
    const res = await request(app)
      .get('/api/vehicles/search?make=Toyota')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].make).toBe('Toyota');
  });

  it('should filter by price range', async () => {
    const res = await request(app)
      .get('/api/vehicles/search?minPrice=1000000&maxPrice=2000000')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].model).toBe('City');
  });
});

describe('PUT /api/vehicles/:id', () => {
  it('should update a vehicle', async () => {
    const created = await request(app)
      .post('/api/vehicles')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        make: 'Honda',
        model: 'City',
        category: 'Sedan',
        price: 1320000,
        quantity: 5,
      });

    const res = await request(app)
      .put(`/api/vehicles/${created.body._id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ price: 1500000 });

    expect(res.statusCode).toBe(200);
    expect(res.body.price).toBe(1500000);
  });
});

describe('POST /api/vehicles/:id/purchase', () => {
  it('should decrease quantity by 1 on purchase', async () => {
    const created = await request(app)
      .post('/api/vehicles')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        make: 'Honda',
        model: 'City',
        category: 'Sedan',
        price: 1320000,
        quantity: 5,
      });

    const res = await request(app)
      .post(`/api/vehicles/${created.body._id}/purchase`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.quantity).toBe(4);
  });

  it('should block purchase if quantity is 0', async () => {
    const created = await request(app)
      .post('/api/vehicles')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        make: 'Honda',
        model: 'City',
        category: 'Sedan',
        price: 1320000,
        quantity: 0,
      });

    const res = await request(app)
      .post(`/api/vehicles/${created.body._id}/purchase`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toBe(400);
  });
});

describe('POST /api/vehicles/:id/restock', () => {
  it('should increase quantity on restock by admin', async () => {
    const created = await request(app)
      .post('/api/vehicles')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        make: 'Honda',
        model: 'City',
        category: 'Sedan',
        price: 1320000,
        quantity: 2,
      });

    const res = await request(app)
      .post(`/api/vehicles/${created.body._id}/restock`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ amount: 5 });

    expect(res.statusCode).toBe(200);
    expect(res.body.quantity).toBe(7);
  });

  it('should block restock if user is not admin', async () => {
    const created = await request(app)
      .post('/api/vehicles')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        make: 'Honda',
        model: 'City',
        category: 'Sedan',
        price: 1320000,
        quantity: 2,
      });

    const res = await request(app)
      .post(`/api/vehicles/${created.body._id}/restock`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ amount: 5 });

    expect(res.statusCode).toBe(403);
  });
});