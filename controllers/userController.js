const userModel = require("../models/userModel");
const bcrypt = require('bcrypt')
const { createSecretToken } = require('../util/SecretToken')

// login callback
const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send("User Not Found");
    }
    const auth = await bcrypt.compare(password, user.password)
    if(!auth) {
      return res.status(401).json({message: "Incorrect password or email"})
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false
    })
    res.status(201).json({
      message: "User logged in successfully",
      success: true,
      user,
    });
    next()
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

//Register Callback
const registerController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await userModel.create({ name, email, password })
    const token = createSecretToken(user._id)
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false
    })
    // await newUser.save();
    res.status(201).json({
      message: "User signed in successfully",
      success: true,
      user,
    });
    next()
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

module.exports = { loginController, registerController };
