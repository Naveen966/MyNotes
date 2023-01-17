require("dotenv").config();
const mongoose = require("mongoose");

const connectToMongoose = () => {
  mongoose.connect(process.env.MONGO_DB_URL, () => {
    console.log("mongoose has been connected");
  });
};

module.exports = connectToMongoose;
