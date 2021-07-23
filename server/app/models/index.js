const mongoose = require("mongoose");

const db = {};

//db.mongoose = mongoose;

db.user = require("./user");
db.post = require("./post");
module.exports = db;
