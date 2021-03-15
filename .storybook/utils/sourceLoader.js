const cache = require("./cache");

module.exports = function sourceLoader(source) {
  const opts = this.query || {};
  const { root = "", compiled } = opts;
  const path = this.resourcePath;
  if (!root || path.includes(root)) {
    cache.register(
      path.substr(root.length).replace(/^\//, ""),
      source,
      compiled
    );
  }
  return path.match(".test.") && compiled ? "" : source;
};
