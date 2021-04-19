/*
 * /index.js
*/

const express = require("express");
const bp = require("body-parser");
const port = 5000;
const app = express();
const router = require("./routes");

app.use(express.urlencoded());
app.use('/', router);



app.listen(5000, () => {
  console.log(`Example app listening on port 5000!`);
});