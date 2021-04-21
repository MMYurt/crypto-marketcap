/*
 * /index.js
*/

const express = require("express");
const bp = require("body-parser");
const port = 5000;
const app = express();
const router = require("./routes");
const cors = require('cors');


app.use(cors({ origin: true }));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.use(express.urlencoded());
app.use('/', router);




app.listen(5000, () => {
  console.log(`Example app listening on port 5000!`);
});