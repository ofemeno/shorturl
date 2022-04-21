const mongoose = require("mongoose");
require('dotenv').config()

const db = process.env.MONGODB_URI;

const connect_to_database = async () => {
  try {
    mongoose.connect(db);
    console.log("Database connected...")
  } catch (err) {
    console.error(err);
    process.exit(1)
  }
};

module.exports = { connect_to_database };
