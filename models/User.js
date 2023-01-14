const mongoose = require("mongoose");
const UserDataSchema = new mongoose.Schema({
  userName: {
    require: true,
    type: String,
    unique: true,
  },
  userDP: {
    type: String,
  },
  phoneNumber: {
    type: Number,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  aboutUser: {
    type: String,
  },
});
const UserData = mongoose.model("UserData", UserDataSchema);
module.exports = UserData;
