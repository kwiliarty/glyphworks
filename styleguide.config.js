/* global require,module,__dirname */

const path = require('path')

module.exports = {
  title: 'GlyphWorks',
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
  sections: [
    {
      name: 'Fonts',
      content: './main/themes/fonts.md',
    },
    {
      name: 'Components',
      components: './main/components/**/[A-Z]*.js',
    },
  ],
}
