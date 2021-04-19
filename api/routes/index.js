/*
 * routes/index.js
 */

const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/getData", (req, res) => {
  axios
    .get("https://api.coinlore.net/api/tickers/")
    .then((response) => {
      console.log(response.data);
      res.send(response.data);
    })
    //.then((response) => console.log(response))
    .catch((err) => console.log(err));
});

module.exports = router;
