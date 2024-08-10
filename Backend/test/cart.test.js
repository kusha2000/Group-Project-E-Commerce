const request = require('supertest');
const app = require('../index'); 
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const connectDB = require('../db');

process.env.PORT = 5001; 

describe('Cart API', () => {
  let token;

  beforeAll(async () => {
    await connectDB(); 

    await request(app)
      .post('/signup')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password',
      });
    const loginResponse = await request(app)
      .post('/login')
      .send({
        email: 'testuser@example.com',
        password: 'password',
      });
    token = loginResponse.body.token;
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  test('should add an item to the cart', async () => {
    const response = await request(app)
      .post('/addtocart')
      .set('auth-token', token)
      .send({ itemId: 1 }); 
    expect(response.status).toBe(200);
    expect(response.text).toBe('Added the product to the cart');
  });

  test('should remove an item from the cart', async () => {
    const response = await request(app)
      .post('/removefromcart') 
      .set('auth-token', token)
      .send({ itemId: 1 });
    expect(response.status).toBe(200);
    expect(response.text).toBe('Removed the product from the cart');
  });

  test('should get cart data', async () => {
    const response = await request(app)
      .post('/getcart')
      .set('auth-token', token);
    expect(response.status).toBe(200);
    expect(typeof response.body).toBe('object');
  });
});
