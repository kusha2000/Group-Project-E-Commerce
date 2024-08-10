// db.js
const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI ;

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to DB");
    }
  } catch (error) {
    console.error("Error connecting to DB:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
