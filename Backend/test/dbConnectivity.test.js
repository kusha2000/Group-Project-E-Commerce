const mongoose = require('mongoose');
const connectDB = require('../db');  

describe('Database Connectivity', () => {
  beforeAll(async () => {
    await mongoose.disconnect();
  });

  test('should connect to the database', async () => {

    expect(mongoose.connection.readyState).toBe(0);
    await connectDB();
    expect(mongoose.connection.readyState).toBe(1);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
});
