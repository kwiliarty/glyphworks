/* global require,__dirname */

const path = require('path')
// var webpack = require('webpack')
const BundleTracker = require('webpack-bundle-tracker')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const { styles } = require( '@ckeditor/ckeditor5-dev-utils' )

var config = {
  context: __dirname,

  entry: {
    main: './main/assets/js/index.js',
  },

  output: {
    path: path.resolve('./main/assets/bundles/'),
    filename: '[name]-[fullhash].js',
    publicPath: 'static/bundles/',
    // libraryTarget: 'var',
    // library: 'Roster'
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  plugins: [
    new BundleTracker({filename: './main/webpack-stats.json'}),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({filename: '[name]-[fullhash].css'}),
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [
          /node_modules/,
        ],
        use: [
          {
            loader: 'babel-loader',
            // query: {
            //   presets: ['@babel/preset-react']
            // },
          },
        ],
      }, // to transform JSX into JS
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
        exclude: [
          /mixin/,
          /ckeditor/,
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },

  resolve: {
    modules: [ path.resolve('/node_modules') ],
    extensions: ['.js', '.jsx']
  },
}

module.exports = (env,argv) => {
  if (argv.mode === 'development'){
    config.devtool= 'inline-source-map'
  }

  return config
}
