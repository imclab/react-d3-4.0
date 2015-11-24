/* eslint-disable */

var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/main.js',
  output: {
    path: __dirname,
    filename: 'build.js'
  },
  module: {
    loaders: [
      {
        test: path.join(__dirname, 'src'),
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ],
  stats: {
    colors: true
  },
  devtool: 'source-map'
};