const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  //save to db
  try {
    res.send("Hello");
  } catch {
    res.status(400).json({ err: "err" });
  }
};
