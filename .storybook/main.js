const path = require("path");
const CodePlugin = require("./utils/CodePlugin");

module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.jsx?$|\.css$/,
      use: [
        {
          loader: path.resolve(__dirname, "utils/sourceLoader.js"),
          options: { root: path.resolve(__dirname, "../stories") },
        },
      ],
    });
    config.plugins.push(new CodePlugin());
    // prevent filename mangling (which b0rks source file switching)
    config.mode = "development";
    // prevent minification
    config.optimization.minimizer = [];
    // Return the altered config
    return config;
  },
  addons: ["../preset.js"],
};
