const jwt = require("jsonwebtoken");
const USER = require("../models/USER");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};
// Login

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  try {
    const user = await USER.login({
      username,
      password,
    });
    console.log(user);
    // create a token
    const token = createToken(user._id);
    res.status(200).json({
      username,
      token,
      profilePicture: user.profilePicture,
    });
    console.log("signup OK");
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error.message);
  }
};
// Signup

const SignupUser = async (req, res) => {
  const { username, password } = req.body;
  // const {profilePicture}
  // console.log(req.file);
  try {
    const user = await USER.signup({
      profilePicture: req.file.filename,
      username,
      password,
    });

    // create a token
    const token = createToken(user._id);

    res.status(200).json({
      username,
      profilePicture: req.file.filename,
      token,
    });
    console.log("signup OK");
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error.message);
  }
};

module.exports = {
  loginUser,
  SignupUser,
};
