/* global __dirname */

const path = require('path')

module.exports = {
  title: 'GlyphWorks',
  styleguideComponents: {
    Wrapper: path.join( __dirname, './main/themes/ThemeProvider' )
  },
  serverPort: 443,
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
      ]
    },
    devServer: {
      allowedHosts: [
        'styleguidist.dev.test',
        '0.0.0.0',
      ],
    },
  },
  sections: [
    {
      name: 'Fonts',
      content: './main/themes/fonts.md',
    },
    {
      name: 'Colors',
      content: './main/themes/colors.md',
    },
    {
      name: 'Images',
      content: './main/themes/images.md',
    },
    {
      name: 'Theme',
      content: './main/themes/theme.md',
    },
    {
      name: 'Layout',
      components: './main/layouts/**/[A-Z]*.js',
    },
    {
      name: 'Components',
      components: './main/components/**/[A-Z]*.js',
    },
  ],
}
