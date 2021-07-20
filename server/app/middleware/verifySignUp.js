const db = require("../models");
const User = db.user;

checkDuplicateUsernameOrEmail = async(req, res, next) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: "Could Not Verify User" });
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;
