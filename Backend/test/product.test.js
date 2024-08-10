const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');
const connectDB = require('../db');

process.env.PORT = 5002; 

describe('Product API', () => {
    beforeAll(async () => {
        await connectDB(); 
      });
    
      afterAll(async () => {
        await mongoose.connection.dropDatabase(); 
        await mongoose.connection.close(); 
      });



  test('should add a product', async () => {
    const response = await request(app)
      .post('/addproduct')
      .send({
        name: 'Test Product',
        image: 'http://example.com/image.jpg',
        category: 'test',
        new_price: 100,
        old_price: 150,
      });
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test('should remove a product', async () => {
    const response = await request(app)
      .post('/removeproduct')
      .send({ id: 1 }); 
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test('should fetch all products', async () => {
    const response = await request(app).get('/allproducts');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
