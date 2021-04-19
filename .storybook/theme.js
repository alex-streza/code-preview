// .storybook/YourTheme.js

import { create } from "@storybook/theming";

export default create({
  base: "light",

  colorPrimary: "#0D0628",
  colorSecondary: "#541D5B",

  // UI
  appBg: "white",
  appContentBg: "white",
  appBorderColor: "white",
  appBorderRadius: 4,

  // Typography
  // fontBase: "Consolas",

  // Text colors
  textColor: "black",
  textInverseColor: "rgba(255,255,255,0.9)",

  // Toolbar default and active colors
  barTextColor: "white",
  barSelectedColor: "white",
  barBg: "#0D0628",

  // Form colors
  inputBg: "white",
  inputTextColor: "white",
  inputBorderRadius: 4,

  brandTitle: "Code Preview - Addon",
  brandUrl: "https://github.com/alex-streza/code-preview",
  brandImage: "https://i.ibb.co/2KkRzXc/logo.png",
});
