const db = require("../models");
const User = db.user;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    if (user) {
      res.status(400).json({ message: "Failed! Username is already in use!" });
      return;
    }

    const email = await User.findOne({
      email: req.body.email,
    });
    if (email) {
      res.status(400).send({ message: "Failed! Email is already in use!" });
      return;
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: `Could Not Verify User : ${err}` });
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;
