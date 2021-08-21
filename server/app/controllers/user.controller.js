const mongoose = require("mongoose");
const db = require("../models");
const { findOne } = require("../models/user");
const Post = db.post;
const User = db.user;

exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).select("-password");
    const post = await Post.find({ postedBy: req.params.id }).populate(
      "postedBy",
      "_id name"
    );
    return res.status(200).json({ post, user });
  } catch (err) {
    res.status(404).send({ message: `No User Found ` });
  }
};
exports.followUser = async (req, res) => {
  const userFollowed = await User.findByIdAndUpdate(
    req.body.followId,
    {
      $push: { followers: req.userId },
    },
    { new: true }
  ).select("-password");;
  const userHimself = await User.findByIdAndUpdate(
    req.userId,
    {
      $push: { following: req.body.followId },
    },
    {
      new: true,
    }
  ).select("-password");
  console.log(userFollowed);
  console.log(userHimself);
  res.send({ userFollowed, userHimself });
};

exports.unfollowUser = async (req, res) => {
  const userUnfollowed = await User.findByIdAndUpdate(
    req.body.followId,
    {
      $pull: { followers: req.userId },
    },
    { new: true }
  ).select("-password");
  const userHimself = await User.findByIdAndUpdate(
    req.userId,
    {
      $pull: { following: req.body.followId },
    },
    {
      new: true,
    }
  ).select("-password");
  console.log(userUnfollowed);
  console.log(userHimself);
  res.send({ userUnfollowed, userHimself });
};
