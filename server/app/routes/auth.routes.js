const express = require("express");
const router = express.Router();
const authcontroller = require("../controllers/auth.controller");
console.log("router loaded");
router.get("/", authcontroller.signup);

module.exports = router;
