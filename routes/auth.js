require("dotenv").config();
const router = require("express").Router();
const UserData = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const authenticate = require("../middleware/authentication");

const validation = [
  body("phoneNumber", "The password must have 10 digits").isLength(10),
  body("email", "The Email must be valid").isEmail(),
  body("password", "The password must have 7 character").isLength({ min: 5 }),
];

// Route 1: Sign up: POST "/api/auth/signup"
router.post("/signup", validation, async (req, res) => {
  const { userName, phoneNumber, email, password } = req.body;

  // validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    if (!userName || !phoneNumber || !email || !password) {
      return res.json({ error: "Please fill all the fields correctly" });
    } else {
      const hashPassword = await bcrypt.hash(password, 9);
      const findExistUser = await UserData.findOne({ userName: userName });
      const findExitsEmail = await UserData.findOne({ email: email });
      // user already exits functionality
      if (findExistUser || findExitsEmail) {
        return res
          .json({ error: "Please recheck your credentials" })
          .status(400);
      } else {
        const authenticateUser = await new UserData({
          userName: userName,
          userDP:
            "https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-users-icon-png-image_4144740.jpg",
          phoneNumber: phoneNumber,
          email: email,
          password: hashPassword,
        });

        const jwt_sign = jwt.sign(
          { _id: authenticateUser._id },
          process.env.SECRET_KEY
        );
        await authenticateUser.save();
        if (jwt_sign) {
          return res
            .json({
              success: jwt_sign,
              msg: "registered successfully",
            })
            .status(200);
        }
      }
    }
  } catch (error) {
    return res.json({ error: "something got wrong" }).status(400);
  }
});

// Route 2: Login: POST "/api/auth/login"
router.post(
  "/login",
  [body("password", "The password must have 7 character").isLength({ min: 7 })],
  async (req, res) => {
    const { userName, password } = req.body;

    // validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const authenticateUser = await UserData.findOne({ userName: userName });
      const comparedPassword = await bcrypt.compare(
        password,
        authenticateUser.password
      );

      if (!comparedPassword || !authenticateUser) {
        return res.json({ error: "Sorry! Recheck your credentials" });
      } else {
        // jwt authentication
        const jwt_sign = jwt.sign(
          { _id: authenticateUser._id },
          process.env.SECRET_KEY
        );
        if (jwt_sign)
          return res
            .json({ success: jwt_sign, msg: "Logged-in Successfully" })
            .status(200);
      }
    } catch {
      res.json({
        error: "something went wrong please tell again with right credentials",
      });
    }
  }
);

// Route 3: Get detail of User: GET "/api/auth/getuser"
router.get("/getuser", authenticate, async (req, res) => {
  try {
    const userInfo = await UserData.findById(req.authUser).select("-password");

    // if user is not not authenticated then
    if (!userInfo) {
      return res
        .status(401)
        .json({ error: "please authenticate with a valued token" });
    }

    res.json(userInfo);
  } catch {
    res.status(401).json({ error: "please authenticate with a valued token" });
  }
});

// Route 4: Change User DP: PUT "/api/auth/userpic"
router.put("/userpic", authenticate, async (req, res) => {
  const { userDP } = req.body;
  if (!userDP) {
    return res
      .json({ error: "Some problem has occurred, Try again (due to not URL)" })
      .status(404);
  } else {
    const userNewImage = {
      userDP: userDP,
    };

    const userPhoto = await UserData.findByIdAndUpdate(
      req.authUser,
      { $set: userNewImage },
      { new: true }
    );

    // If UserNewImage is null
    if (!userPhoto) {
      res.json({ error: "Some problem has occurred, Try again" }).status(404);
    }

    // If all things are successfully succeed
    if (userPhoto) {
      res
        .json({ success: userPhoto, msg: "Image has been changed" })
        .status(200);
    }
  }
});

module.exports = router;
