const paths = require('./paths')
const Dotenv = require('dotenv-webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  output: {
    path: paths.build,
    publicPath: '/',
    filename: 'js/[name].[contenthash].js',
  },
  plugins: [
    new Dotenv({
      path: './.env.production',
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),
  ],
  module: {
    rules: [],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 8,
      minSize: 2,
      cacheGroups: {
        appcore: {
          name: 'lib',
          test: /lib[\\/](base|services|common)[\\/]/,
          chunks: 'all',
          priority: -2,
        },
        appvendors: {
          name: 'app-vendors',
          test: /node_modules[\\/](lodash-es|rxjs|axios|@babel\/runtime|process|cookie|js-cookie|is-buffer)[\\/]/,
          chunks: 'all',
          priority: -5,
        },
        vendors: {
          name: 'global-vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          priority: -10,
        },
      },
    },
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        terserOptions: {
          mangle: true,
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
    runtimeChunk: {
      name: 'runtime',
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
})
