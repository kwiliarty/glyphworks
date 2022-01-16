/* global require,module,__dirname */

const path = require('path')

module.exports = {
  title: 'GlyphWorks',
  components: '**/components/**/[A-Z]*.js',
  styleguideComponents: {
    Wrapper: path.join( __dirname, './main/themes/ThemeProvider' )
  },
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
      ]
    }
  },
}
