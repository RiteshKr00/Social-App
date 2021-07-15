const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect("mongodb://localhost:27017/UserDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); //to connect to database
mongoose.connection.on("connected", () => {
  console.log("connected to mongo");
});
mongoose.connection.on("error", () => {
  console.log("error connecting to mongo", err);
});

require("./app/models/user");

app.use(express.json()); //repalcement of bodyparser
app.use(require("./app/routes/auth.routes"))
app.listen(process.env.PORT, () => {
  console.log("Server is runnng at port", process.env.PORT);
});
