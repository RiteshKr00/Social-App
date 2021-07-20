const mongoose = require("mongoose");

const db = {};

//db.mongoose = mongoose;

db.user = require("./user");

module.exports = db;
