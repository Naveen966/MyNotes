require("dotenv").config();
const mongoose = require("mongoose");
const url = `mongodb+srv://naveen85966:kkwbjDeIUB3ZFzct@cluster0.ymcx1cd.mongodb.net/?retryWrites=true&w=majority`;
// const url = process.env.MONGO_DB_URL;

const connectToMongoose = () => {
  mongoose.connect(url, () => {
    console.log("mongoose has been connected");
  });
};

module.exports = connectToMongoose;
