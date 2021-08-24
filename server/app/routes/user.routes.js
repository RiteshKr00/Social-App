const express = require("express");
const usercontroller = require("../controllers/user.controller");
const { authJwt } = require("../middleware");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  //use middleware in array *
  app.get("/user/:id", [authJwt.verifyToken], usercontroller.getUser);
  app.put("/follow", [authJwt.verifyToken], usercontroller.followUser);
  app.put("/unfollow", [authJwt.verifyToken], usercontroller.unfollowUser);
  app.put("/updatepic", [authJwt.verifyToken], usercontroller.updatePic);
};
