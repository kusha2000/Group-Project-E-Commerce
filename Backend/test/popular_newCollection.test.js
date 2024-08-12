const request = require('supertest');
const app = require('../index'); 
const mongoose = require('mongoose');
const connectDB = require('../db');

process.env.PORT = 5005; 


beforeAll(async () => {
    await connectDB(); 
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase(); 
    await mongoose.connection.close(); 
  });

describe('API Endpoints', () => {
  describe('GET /newcollection', () => {
    it('should fetch the new collection of products', async () => {
      const Product = mongoose.model('Product');
      await Product.create([
        {id:1, name: 'Product 1', category: 'women', new_price: 100, old_price: 150 ,image: 'http://example.com/image.jpg'},
        {id:2, name: 'Product 2', category: 'women', new_price: 200, old_price: 250,image: 'http://example.com/image.jpg', },
        // Add more test data if needed
      ]);

      const response = await request(app).get('/newcollection');
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(0);
    });
  });

  describe('GET /popularinwomen', () => {
    it('should fetch popular products in women category', async () => {
      const Product = mongoose.model('Product');
      await Product.create([
        {id:3, name: 'Product A', category: 'women', new_price: 100, old_price: 150,image: 'http://example.com/image.jpg', },
        {id:4, name: 'Product B', category: 'women', new_price: 200, old_price: 250,image: 'http://example.com/image.jpg', },
        // Add more test data if needed
      ]);

      const response = await request(app).get('/popularinwomen');
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(3);
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0]).toHaveProperty('category');
      expect(response.body[0]).toHaveProperty('new_price');
      expect(response.body[0]).toHaveProperty('old_price');
    });
  });
});
