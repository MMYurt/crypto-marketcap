const axios = require("axios");
const processData = require('../utils/processData')


const fetchData = async () => {
  try {
    const res = await axios.get("https://api.coinlore.net/api/tickers/"); 
    
    return processData(res.data.data)
  }
  catch (err) {
    console.log(err);
  }
};

module.exports = fetchData;
