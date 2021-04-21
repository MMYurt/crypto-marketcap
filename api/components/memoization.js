// In-memory caching for prevent sending API request to coinlore on every request.
// By this way, data consumption, cost and application speed optimized significantly.
// TTL (time-to-live) limit can be controlled with constructor. Default val: 1 min

class DataCache {
  constructor(fetchFunction, minutesToLive = 1) {
    this.millisecondsToLive = minutesToLive * 60 * 1000; //TTL value
    this.fetchFunction = fetchFunction; //Promise from constructor
    this.cache = null;
    this.getData = this.getData.bind(this);
    this.isCacheExpired = this.isCacheExpired.bind(this);
    this.fetchDate = new Date(0);
  }
  isCacheExpired() {
    return (
      this.fetchDate.getTime() + this.millisecondsToLive < new Date().getTime()
    ); //If TTL values is expired, return true and
  }
  async getData() {
    if (!this.cache || this.isCacheExpired()) {
      console.log("expired - fetching new data");
      var response = await this.fetchFunction();
      this.cache = response;
      this.fetchDate = new Date();

      return response;
    } else {
      console.log("cache hit");
      return Promise.resolve(this.cache);
    }
  }
}

module.exports = DataCache;
