require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const connection = require("./db");
const path = require("path");

connection();

app.use(cors());
app.use(express.json());
app.use("/api/auth/", require("./routes/auth"));
app.use("/api/notes/", require("./routes/notes"));

app.use(express.static(path.join(__dirname, "./my-notes/build")));

// console.log(path.join(__dirname, "./my-notes/build/index.html"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./my-notes/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
