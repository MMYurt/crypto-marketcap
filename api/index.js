/*
 * /index.js
 */

const express = require("express");
const app = express();
const router = require("./routes");

app.use(function (req, res, next) {
  //To handle CORS policy error
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.use(express.urlencoded({ extended: true })); //JSON Parser
app.use("/", router); //Router Middleware

app.listen(5000, () => {
  console.log(`API listening on localhost:5000`);
});
