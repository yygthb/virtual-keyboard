const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: !isProd && 'source-map',
  entry: './src/index.js',
  output: {
    filename: '[fullhash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devServer: {
    port: 3005,
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      title: 'Virtual Keyboard',
      minify: {
        collapseWhitespace: false,
      },
      inject: 'body',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/img/favicon.ico'),
          to: path.resolve(__dirname, 'dist/assets/img/favicon.ico'),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: isProd ? '[name].[contenthash].css' : '[name].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
};
