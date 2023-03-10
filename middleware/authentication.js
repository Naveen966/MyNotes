require("dotenv").config();
const jwt = require("jsonwebtoken");

const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  // console.log(token);
  if (!token) {
    res.status(401).json({ error: "please authenticate with a valued token1" });
  }

  try {
    const data = await jwt.verify(token, process.env.SECRET_KEY);
    // logged-in user all data is in below 'req.authUser' called variable.
    req.authUser = data._id;
    // console.log(req.authUser);
    next();
  } catch {
    res.status(401).json({ error: "please authenticate with a valued token3" });
  }
};

module.exports = fetchUser;
