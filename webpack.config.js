/* global __dirname, require, module*/

const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const path = require('path');

let plugins = [
  require('autoprefixer'),
  new WebpackNotifierPlugin({
    contentImage: path.join(__dirname, 'assets/louis.png'),
  }),
  new UglifyJsPlugin({ minimize: true }),
  new ExtractTextPlugin('styles.css'),
];

const config = {
  entry: {
    main: path.resolve(__dirname, './src/main.js'),
    styles: path.resolve(__dirname, './src/oui/oui.scss'),
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    chunkFilename: '[name]-[hash].js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css', 'postcss-loader'],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
    ],
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js'],
  },
  plugins: plugins,
  externals: {
    react:
      'React',
    'react-dom': 'ReactDOM',
  },
};


module.exports = config;
