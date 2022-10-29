/* global __dirname */

const path = require('path')
const fs = require('fs')

module.exports = {
  title: 'GlyphWorks',
  styleguideComponents: {
    Wrapper: path.join( __dirname, './main/themes/ThemeProvider' )
  },
  serverPort: 443,
  assetsDir: '',
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
  updateExample( props, exampleFilePath ) {
    const { settings, lang } = props
    if ( settings && typeof settings.file === 'string' ) {
      const filepath = path.resolve(exampleFilePath, settings.file)
      settings.static = true
      delete settings.file
      return {
        content: fs.readFileSync(filepath, 'utf8'),
        settings,
        lang
      }
    }
    return props
  }
}
