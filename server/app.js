const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
app.use(cors());

mongoose.connect("mongodb://localhost:27017/GramDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); //to connect to database
mongoose.connection.on("connected", () => {
  console.log("connected to mongo");
});
mongoose.connection.on("error", () => {
  console.log("error connecting to mongo", err);
});

//const db = require("./app/models");
// require("./app/models/user");

app.use(express.json()); //repalcement of bodyparser
require("./app/routes/auth.routes")(app);
app.listen(process.env.PORT, () => {
  console.log("Server is runnng at port", process.env.PORT);
});
