const axios = require("axios");
const processData = require('../utils/processData')


const fetchData = async () => {
  try {
    const res = await axios.get("https://api.coinlore.net/api/tickers/");     //Data fetching from Coinlore API.
    
    return processData(res.data.data)     //Sending data to component for process.
  }
  catch (err) {
    console.log(err);
  }
};

module.exports = fetchData;
