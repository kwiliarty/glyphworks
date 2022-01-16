/* global process */

module.exports = function (api) {

  // Cypress workaround from https://github.com/cypress-io/cypress/issues/2945
  if (api.cache.using(() => process.env.CYPRESS_INTERNAL_ENV)) {
    return {}
  }

  api.cache(true)

  const presets = [
    '@babel/preset-env',
    '@babel/preset-react',
  ]
  const plugins = [
    '@babel/plugin-proposal-class-properties',
    'babel-plugin-styled-components',
  ]

  return {
    presets,
    plugins
  }
}
