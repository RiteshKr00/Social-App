const express = require("express");
const postcontroller = require("../controllers/post.controller");
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
  app.post("/createpost", [authJwt.verifyToken], postcontroller.createPost);
  app.get("/allpost", [authJwt.verifyToken], postcontroller.allpost);
  app.get("/mypost", [authJwt.verifyToken], postcontroller.mypost);
  app.delete(
    "/deletepost/:postId",
    [authJwt.verifyToken],
    postcontroller.deletepost
  );
  app.put("/likepost", [authJwt.verifyToken], postcontroller.likePost);
  app.put("/unlikepost", [authJwt.verifyToken], postcontroller.unlikePost);
};
