var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {
  entry: {
    app: './web/static/js/entry.jsx'
  },
  output: {
    path: "./priv/static/js",
    filename: "bundle.js"
  },
  eslint: {
    configFile: './.eslintrc'
  },
  devtool: 'eval-source-map',
  module: {
    loaders: [
      { test: /\.(js|jsx)$/, loaders: ['react-hot', 'babel?experimental'] },
      { test: /\.json$/, loader: 'json' },
      { test: /\.yml$/, loader: 'json!yaml' },
      { test: /\.scss$/, loader: 'style!css!sass' },
      { test: /\.(png|woff)$/, loader: 'url-loader?limit=100000' }
    ]
  },
  resolveLoader: { fallback: __dirname + "/node_modules"  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
};

module.exports = config;
