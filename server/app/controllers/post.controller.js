const mongoose = require("mongoose");
const db = require("../models");
const Post = db.post;
const User = db.user;

exports.createPost = async (req, res) => {
  try {
    const { title, body, pic } = req.body;
    if (!title || !body) {
      //pic to be added
      return res.status(422).send({ error: "Plase add all the fields" });
    }
    const post = new Post({
      title,
      body,
      photo: pic,
      postedBy: req.userId,
    });
    const posts = await post.save();
    res.status(200).json({ posts });
  } catch (err) {
    res.status(500).send({ err: err });
  }
};
exports.allpost = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("postedBy", "_id username") //way to populate postedBy and selected field only;
      .sort("-createdAt");
    res.json({ posts });
  } catch (err) {
    res.status(500).send({ err: err });
  }
};
exports.mypost = async (req, res) => {
  try {
    const posts = await Post.find({ postedBy: req.userId })
      .populate("postedBy", "_id username") //way to populate postedBy and selected field only;
      .sort("-createdAt"); //to get recent post first
    res.json({ posts });
  } catch (err) {
    res.status(500).send({ err: err });
  }
};
exports.deletepost = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.postId }).populate(
      "postedBy",
      "_id"
    );
    //Objects are not like arrays or strings. So simply comparing by using "===" or "==" is not possible. Here to compare we have to first stringify the object
    console.log(typeof req.userId);
    if (post.postedBy._id.toString() === req.userId) {
      post.deleteOne();
    }
    res.send(post);
  } catch (err) {
    res.status(500).send({ message: `Could Not able to delete ${err}`});
  }
};
