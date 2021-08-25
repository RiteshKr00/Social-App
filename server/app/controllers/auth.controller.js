const mongoose = require("mongoose");
const db = require("../models");
const User = db.user;
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const Crypto = require("crypto");
const SendResetEmail = require("../middleware/SendResetEmail");
const JWT = process.env.JWT_SEC;

exports.signup = async (req, res) => {
  //save to db
  try {
    const { username, email, password } = req.body;
    if (!email || !password || !username) {
      return res.status(400).send({ error: "please add all the fields" });
    }

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 8),
      pic: req.body.pic,
    });
    await user.save();

    res.status(200).send({ message: "User was registered successfully!" });
  } catch (err) {
    res.status(500).send({ err: err });
  }
};

exports.signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!password || !username) {
      return res.status(400).send({ error: "please add all the fields" });
    }
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(404).send({ message: "User Not Found" });
    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }
    var token = jwt.sign({ id: user.id }, JWT, {
      expiresIn: 86400, // 24 hours
    });
    console.log(user);
    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      post: user.post,
      pic: user.pic,
      following: user.following,
      followers: user.followers,
      accessToken: token,
    });
  } catch (err) {
    res.status(500).send({ err: err });
  }
};
exports.resetPassword = async (req, res) => {
  try {
    const randomString = (size = 21) => {
      return Crypto.randomBytes(size).toString("hex").slice(0, size);
    };
    const token = randomString();
    const user = await User.findOneAndUpdate(
      { email: req.body.email },
      { $set: { resetToken: token, expireToken: Date.now() + 3600000 } },
      { useFindAndModify: false }
    ).select("-password");
    if (!user) {
      return res
        .status(422)
        .json({ error: "User dont exists with that email" });
    }
    SendResetEmail(req.body.email, token);
    res.send("Password Reset Link Sent");
  } catch (err) {
    res.status(500).send({ message: `Email Not Sent ${err} ` });
  }
};
exports.newPassword = async (req, res) => {
  try {
    const { password, token } = req.body;
    const user = await User.findOneAndUpdate(
      { resetToken: token, expireToken: { $gt: Date.now() } },
      {
        $set: {
          password: await bcrypt.hash(password, 8),
          resetToken: undefined,
          expireToken: undefined,
        },
      },
      { useFindAndModify: false }
    ).select("-password");
    if (!user) {
      return res.status(422).json({ error: "Try again session expired" });
    }
    res.send("Password Updated");
  } catch (err) {
    res.status(500).send({ message: `Password not Updated ${err} ` });
  }
};
