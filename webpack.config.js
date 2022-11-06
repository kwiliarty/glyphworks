/* global __dirname */

const path = require('path')
const BundleTracker = require('webpack-bundle-tracker')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

var config = {
  context: __dirname,

  entry: {
    main: './main/assets/js/index.js',
    regenerator: 'regenerator-runtime/runtime.js',
  },

  output: {
    path: path.resolve('./main/assets/bundles/'),
    filename: '[name]-[fullhash].js',
    publicPath: 'static/bundles/',
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
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
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
  if ( argv.mode === 'development' ) {
    config.devtool= 'inline-source-map'
    config.mode = 'development'
  } else {
    config.mode = 'production'
  }

  return config
}
