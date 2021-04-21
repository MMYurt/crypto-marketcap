/*
 * routes/index.js
 */

const express = require("express");
const router = express.Router();
const axios = require("axios");
const fetchData = require("../components/fetchData");
const DataCache = require("../components/memoization");

const tickersCache = new DataCache(fetchData);

router.get("/getData", (req, res) => {
  /*(async () => {
    //console.log(await data);
    //res.send(await fetchData);
    
  })();*/
  tickersCache.getData().then((result) => {
    res.send(result);
    //console.log(result);
  });
  
  console.log("istek geldi");
});

router.get("/test", (req, res) => {
  res.send(["test1", "test2"]);
});

module.exports = router;
