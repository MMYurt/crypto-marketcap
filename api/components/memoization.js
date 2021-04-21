// In-memory caching for prevent sending API request to coinlure on every request. 
// By this way, data consumption, cost and application speed reduced significantly.
// TTL (time-to-live) limit can be controlled with constructor. Default val: 1 min

class DataCache {
  constructor(fetchedData, minutesToLive = 1) {
    this.millisecondsToLive = minutesToLive * 60 * 1000;
    this.fetchedData = fetchedData;
    this.cache = null;
    this.getData = this.getData.bind(this);
    this.resetCache = this.resetCache.bind(this);
    this.isCacheExpired = this.isCacheExpired.bind(this);
    this.fetchDate = new Date(0);
  }
  isCacheExpired() {
    return (this.fetchDate.getTime() + this.millisecondsToLive) < new Date().getTime();
  }
  getData() {
    if (!this.cache || this.isCacheExpired()) {
      console.log('expired - fetching new data');
      
      this.cache = this.fetchedData;
      this.fetchDate = new Date();
      return this.fetchedData;
      
    } else {
      console.log('cache hit');
      return Promise.resolve(this.cache);
    }
  }
  resetCache() {
   this.fetchDate = new Date(0);
  }
}

module.exports = DataCache;