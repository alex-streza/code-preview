const path = require("path");
const CodePlugin = require("./utils/CodePlugin");

module.exports = {
  stories: [
    "../components/**/*.stories.mdx",
    "../components/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.jsx?$|\.tsx?$|\.ts$|\.css$/,
      use: [
        {
          loader: path.resolve(__dirname, "utils/sourceLoader.js"),
          options: { roots: [path.resolve(__dirname, "../components/")] },
        },
      ],
    });
    config.plugins.push(new CodePlugin());
    // prevent filename mangling (which b0rks source file switching)
    config.mode = "development";
    // prevent minification
    config.optimization.minimizer = [];
    // hide warnings
    config.stats = { warnings: false };
    // Return the altered config
    return config;
  },
  addons: ["../preset.js"],
};
