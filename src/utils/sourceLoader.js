const cache = require("./cache");

module.exports = function sourceLoader(source) {
  const opts = this.query || {};
  const { roots = [], compiled } = opts;
  const path = this.resourcePath;
  for (const root of roots) {
    if (!root || path.includes(root)) {
      console.log(`miau`, path);
      cache.register(
        path.substr(root.length).replace(/^\//, ""),
        source,
        compiled
      );
    }
  }
  return path.match(".test.") && compiled ? "" : source;
};
