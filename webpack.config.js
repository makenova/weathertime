var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/views/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: __dirname + '/public',
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, include: __dirname + '/src', exclude: /node_modules/, loader: 'babel-loader'}
    ]
  },
  plugins: [HtmlWebpackPluginConfig]
}
