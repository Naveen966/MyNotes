const mongoose = require("mongoose");

const Notes = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserData",
  },
  title: {
    require: true,
    type: String,
  },
  description: {
    require: true,
    type: String,
  },
  tag: {
    require: true,
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const notesSchema = mongoose.model("note", Notes);
module.exports = notesSchema;
