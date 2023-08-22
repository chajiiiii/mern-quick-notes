const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const bcrypt = require("bcrypt");

module.exports = {
  create,
  login,
  checkToken,
};

function checkToken(req, res) {
  console.log("req.user", req.user);
  res.json(req.exp);
}

async function create(req, res) {
  try {
    // Add the user to the database
    const user = await User.create(req.body);

    // token will be a string
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    // 400 = bad request
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    console.log("hello");
    const match = await bcrypt.compare(req.body.password, user.password);
    console.log(match);

    if (!match) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.json(createJWT(user));
  } catch (err) {
    // 400 = bad request
    res.status(400).json(err);
  }
}

// Helper Functions

function createJWT(user) {
  console.log(process.env.SECRET);
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: "24h" }
  );
}
