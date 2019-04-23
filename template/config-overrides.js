// config-overrides.js
const {
  getLoader
} = require("react-app-rewired");
const tsImportPluginFactory = require('ts-import-plugin');
const rewireProvidePlugin = require('react-app-rewire-provide-plugin');

module.exports = function override(config, env) {
  const tsLoader = getLoader(
    config.module.rules,
    rule =>
      rule.loader &&
      typeof rule.loader === 'string' &&
      rule.loader.includes('ts-loader')
  );

  tsLoader.options = {
    getCustomTransformers: () => ({
      before: [
        tsImportPluginFactory([
          {
            libraryName: 'antd',
            libraryDirectory: 'lib',
            style: true
          },
          {
            libraryName: "antd-mobile",
            libraryDirectory: 'lib',
            style: true
          }
        ])
      ]
    })
  };

  config = rewireProvidePlugin(config, env, {
    $: 'jquery',
    jQuery: 'jquery',
    React: 'react',
    ReactDOM: 'react-dom'
  });
  return config;
};