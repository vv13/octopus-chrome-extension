const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const ExtensionReloader = require('webpack-extension-reloader');
const locateContentScripts = require('./utils/locateContentScripts');

const publicRootPath = path.join(__dirname, 'public');
const moduleRootPath = path.join(__dirname, 'src/modules');
const sourceRootPath = path.join(__dirname, 'src');
const contentScriptsPath = path.join(moduleRootPath, 'contentScripts');
const distRootPath = path.join(__dirname, 'dist');
const nodeEnv = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const webBrowser = process.env.WEB_BROWSER ? process.env.WEB_BROWSER : 'chrome';

const contentScripts = locateContentScripts(contentScriptsPath);

const extensionReloader =
  nodeEnv === 'watch'
    ? new ExtensionReloader({
        port: 9128,
        reloadPage: true,
        entries: {
          background: 'background',
          extensionPage: ['popup', 'options', 'newtab'],
          contentScript: Object.keys(contentScripts),
        },
      })
    : () => {
        this.apply = () => {};
      };

module.exports = {
  watch: nodeEnv === 'watch',
  entry: {
    background: path.join(sourceRootPath, 'modules/background', 'index.ts'),
    options: path.join(sourceRootPath, 'modules/options', 'index.tsx'),
    popup: path.join(sourceRootPath, 'modules/popup', 'index.tsx'),
    newtab: path.join(sourceRootPath, 'modules/newtab', 'index.tsx'),
    ...contentScripts,
  },
  output: {
    path: distRootPath,
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)?$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CheckerPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(moduleRootPath, 'options', 'options.html'),
      inject: 'body',
      filename: 'options.html',
      title: 'Octopus - Options Page',
      chunks: ['options'],
    }),
    new HtmlWebpackPlugin({
      template: path.join(moduleRootPath, 'popup',  'popup.html'),
      inject: 'body',
      filename: 'popup.html',
      title: 'Octopus - Popup Page',
      chunks: ['popup'],
    }),
    new HtmlWebpackPlugin({
      template: path.join(moduleRootPath, 'newtab', 'newtab.html'),
      inject: 'body',
      filename: 'newtab.html',
      title: 'Octopus - NewTab Page',
      chunks: ['newtab'],
    }),
    new CopyWebpackPlugin([
      {
        from: publicRootPath,
        to: distRootPath,
      },
    ]),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(nodeEnv),
      WEB_BROWSER: JSON.stringify(webBrowser),
    }),
    extensionReloader,
  ],
};

if (nodeEnv === 'production') {
  module.exports.plugins.push(
    new CleanWebpackPlugin(distRootPath, { verbose: true, dry: false }),
  );
}
