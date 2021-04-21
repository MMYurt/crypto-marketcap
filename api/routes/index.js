/*
 * routes/index.js
 */

const express = require("express");
const router = express.Router();

const fetchData = require("../components/fetchData");
const DataCache = require("../components/memoization");

const tickersCache = new DataCache(fetchData, 1); //Creating an DataCache (class) instance. While creating, also first api request is sent and cached.

router.get("/getData", (req, res) => {
  //  /getData endpoint

  tickersCache.getData().then((resp) => res.send(resp));
});


module.exports = router;
