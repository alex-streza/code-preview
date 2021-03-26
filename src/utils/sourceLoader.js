const cache = require("./cache");

module.exports = function sourceLoader(source) {
  const opts = this.query || {};
  const { roots = [], compiled } = opts;
  const path = this.resourcePath;
  for (const root of roots) {
    console.log(`root, path`, root, path);
    if (!root || (path.includes(root) && !path.includes("node_modules"))) {
      console.log(`loaded file`, root, path);
      cache.register(
        path.substr(path.indexOf(root) + root.length),
        source,
        compiled,
      );
    }
  }
  return path.match(".test.") && compiled ? "" : source;
};
