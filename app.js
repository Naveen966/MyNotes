require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const PORT = process.env.port || 5000;
const connection = require("./db");
const path = require("path");
const { dirname } = require("path");

connection();

app.use(cors());
app.use(express.json());
app.use("/api/auth/", require("./routes/auth"));
app.use("/api/notes/", require("./routes/notes"));

app.use(express.static(path.join(__dirname, "./my-notes/build")));

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "./my-notes/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
