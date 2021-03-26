const cache = require("./cache");

module.exports = function sourceLoader(source) {
  const opts = this.query || {};
  const { roots = [], compiled } = opts;
  const path = this.resourcePath;
  for (const root of roots) {
    if (!root || (path.includes(root) && !path.includes("node_modules"))) {
      cache.register(
        path.substr(path.indexOf(root) + root.length),
        source,
        compiled,
      );
    }
  }
  return path.match(".test.") && compiled ? "" : source;
};
