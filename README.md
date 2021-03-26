# Storybook Addon Code Preview

This Storybook addon gives you a preview for js|js|ts|tsx|css files of Storybook Components. 
It uses a custom Webpack config & loader and adds a preview tab for all files located under the **components** folder.

- 📝 Easily access story/component code
- ⚛️ History of accessed components
- 📦 Many more to come

## Getting Started

### Installation

First install the addon from npm:

```
npm i --save-dev storybook-addon-code-preview
# or
yarn add --dev storybook-addon-code-preview
```

Then add the following to your .storybook/main.js:

```
module.exports = {
  addons: ['storybook-addon-code-preview']
};
```

After registering the addon you're all good to go 🚀 
