// @ts-check
const path = require('path');
const webpack = require('webpack');

/**
 * @type { import('webpack').Configuration }
 */
module.exports = {
  entry: {
    'client/js/main': './src/client/client.ts'
  },
  output: {
    filename: '[name].js',
    chunkFilename: 'client/js/[name].js'
  },
  mode: 'none',
  devtool: 'source-map',
  watch: false,
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')]
  },
  stats: {
    colors: true,
    entrypoints: true
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [{ loader: 'awesome-typescript-loader' }]
      }
    ]
  }
};
