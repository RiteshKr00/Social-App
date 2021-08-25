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
    resetToken: String,
    expireToken: Date,
    pic: {
      type: String,
      default:
        "https://res.cloudinary.com/slowgeek/image/upload/ar_1:1,b_rgb:262c35,bo_5px_solid_rgb:ff0000,c_fill,g_auto,r_max,w_1000/v1628682553/enxx01pxot2zjqmvola9.jpg",
    },
    following: [{ type: ObjectId, ref: "User" }],
    followers: [{ type: ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
