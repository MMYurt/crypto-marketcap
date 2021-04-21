/*
 * /index.js
*/

const express = require("express");
const app = express();
const router = require("./routes");

require('dotenv').config();
const port = process.env.PORT
const host = process.env.HOST

//app.use(cors({ origin: true }));     

app.use(function (req, res, next) {                     //To handle CORS policy error
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});


app.use(express.urlencoded());    //Body Parser
app.use('/', router);     //Router Middleware



app.listen(port, () => {
  console.log(`API listening on ${host}:${port}`);
});