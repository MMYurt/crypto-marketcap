const processData = (data) => {
  var slicedArr = [];
  slicedArr = data.slice(0, 20); //Slicing response to first 20 tickers.


  //Remove unnecessary key-value pairs from response
  const allowed = ["symbol", "rank", "market_cap_usd"];   //These key values be extracted      
  const newArr = [];

  slicedArr.forEach(val => {
    const filtered = Object.keys(val)
    .filter((key) => allowed.includes(key))   
    .reduce((obj, key) => {
      obj[key] = val[key];
      return obj;
    }, {});

    newArr.push(filtered);

    
  });

  //console.log("asd", newArr)
  return newArr;
};

module.exports = processData;
