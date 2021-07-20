const mongoose = require("mongoose");
const db = require("../models");
const User = db.user;
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  //save to db
  try {
    const { username, email, password } = req.body;
    if (!email || !password || !username) {
      return res.status(422).json({ error: "please add all the fields" });
    }

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 8),
    });
    await user.save();

    res.status(200).json({ message: "User was registered successfully!" });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};
