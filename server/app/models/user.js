const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
//define user schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    following: {
      total: {
        type: Number,
        default: 0,
      },
      by: [{ type: ObjectId, ref: "User" }],
    },
    followers: {
      total: {
        type: Number,
        default: 0,
      },
      by: [{ type: ObjectId, ref: "User" }],
    },
    post: {
      //can be removed and postSchema postedBy can be used to retrieve no of Post
      total: {
        type: Number,
        default: 0,
      },
      Posts: [{ type: ObjectId, ref: "Post" }],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
