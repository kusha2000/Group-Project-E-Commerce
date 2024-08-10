const request = require('supertest');
const app = require('../index'); 
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const connectDB = require('../db');

process.env.PORT = 5003; 

describe('User API', () => {
    beforeAll(async () => {
        await connectDB(); 
      });
    
      afterAll(async () => {
        await mongoose.connection.dropDatabase(); 
        await mongoose.connection.close(); 
      });

  test('should register a new user', async () => {
    const response = await request(app)
      .post('/signup')
      .send({
        username: 'testuser',
        email: 'testuser1@example.com',
        password: 'password',
      });
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.token).toBeDefined();
  });

  test('should login a user', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'testuser@example.com',
        password: 'password',
      });
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.token).toBeDefined();
  });


});
