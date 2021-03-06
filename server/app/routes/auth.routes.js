const express = require("express");
const authcontroller = require("../controllers/auth.controller");
const { verifySignUp } = require("../middleware"); //no need to go one folder doen due to index file
/// NEW - Add CORS headers - see https://enable-cors.org/server_expressjs.html
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
      //can be done by cors package
    );
    next();
  });

  app.get("/", authcontroller.signup);
  app.post(
    "/signup",
    [verifySignUp.checkDuplicateUsernameOrEmail],
    authcontroller.signup
  );

  app.post("/signin", authcontroller.signin);
  app.post("/resetpassword", authcontroller.resetPassword);
  app.post("/newpassword", authcontroller.newPassword);
};
