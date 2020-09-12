const path = require('path');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { getEntry, getOutputPath } = require('./viewEngine/helpers');

const dev = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: dev ? 'development' : 'production',
  entry: getEntry(),
  output: {
    filename: '[name].js',
    path: getOutputPath(),
    libraryTarget: 'commonjs2',
  },
  target: 'node',
  externals: [nodeExternals()],
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: [
          'babel-loader',
          {
            loader: 'linaria/loader',
            options: {
              cacheDirectory: '.linaria-cache',
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
              },
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss',
                plugins: [require('tailwindcss'), require('autoprefixer')],
              },
            },
          },
        ],
      },
    ],
  },
};
