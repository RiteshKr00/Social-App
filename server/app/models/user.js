const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
//define user schema
const userSchema = new mongoose.Schema({
  name: {
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
  Post: {
    total: {
      type: Number,
      default: 0,
    },
    Posts: [{ type: ObjectId, ref: "Post" }],
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
