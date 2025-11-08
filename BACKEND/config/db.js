const mongoose = require("mongoose");
const colors  = require("colors")
//const url = MONGO_URL = 'mongodb+srv://dbuser:MSDgokul@007@cluster0.3huatbz.mongodb.net/doctor-app'

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Mongodb connected ${mongoose.connection.host}`.bgGreen.white);
  } catch (error) {
    console.log(`Mongodb Server Issue ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
