// @ts-check
const path = require('path');
const webpack = require('webpack');
const MinifyPlugin = require('babel-minify-webpack-plugin');

/**
 * @type { import('webpack').Configuration }
 */
module.exports = {
  entry: {
    main: './src/client/Index.tsx',
    admin: './src/client/admin.tsx'
  },
  output: {
    filename: '[name].js',
    jsonpFunction: 'webpackJsonpKudoz',
    path: path.join(__dirname, 'dist/client/js')
  },
  mode: 'none',
  // devtool: 'source-map',
  watch: false,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')]
  },
  stats: {
    colors: true,
    entrypoints: true
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [{ loader: 'ts-loader' }]
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.svg$/,
        use: [{ loader: 'babel-loader' }, { loader: 'react-svg-loader' }]
      }
    ]
  },
  optimization: {
    chunkIds: 'named',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true
        },
        commons: {
          chunks: 'initial',
          name: 'common',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0
        }
      }
    },
    runtimeChunk: 'single'
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map',
      exclude: /vendor.*.*/
    }),
    new MinifyPlugin({}, { exclude: /(admin|common|main)\.js/ })
  ]
};
