const path = require("path");
const CodePlugin = require("../utils/CodePlugin");

module.exports = {
  config: function (entry = []) {
    return [...entry, require.resolve("./preview")];
  },
  managerEntries: function (entry = []) {
    return [...entry, require.resolve("./manager")];
  },
  webpackFinal: function (config, { configType }) {
    config.module.rules.push({
      test: /\.jsx?$|\.tsx?$|\.ts$|\.css$/,
      exclude: /(node_modules)/,
      use: [
        {
          loader: path.resolve(__dirname, "../utils/sourceLoader.js"),
          options: { roots: ["components"] },
        },
      ],
    });
    config.plugins.push(new CodePlugin());
    // prevent filename mangling (which b0rks source file switching)
    config.mode = "development";
    // prevent minification
    config.optimization.minimizer = [];
    // hide warnings
    config.stats = { warnings: false, modules: false };
    config.performance = { hints: false };
    config.devServer = { stats: "errors-only" };
    // Return the altered config
    return config;
  },
};
