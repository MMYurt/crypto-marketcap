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
      if(key === "market_cap_usd"){
        val[key] = val[key] / 1000000000        //Data normalization with dividing by a billion
        val[key] = val[key].toFixed(2);         //Fixed to 2 digits in the fractional part
        console.log(val[key])
      }
      obj[key] = val[key];
      return obj;
    }, {});

    newArr.push(filtered);

    
  });

  //console.log("asd", newArr)
  return newArr;
};

module.exports = processData;
