import React from 'react'
import PropTypes from 'prop-types'

const FontSample = props => {
  const { font, declaration } = props
  const simpleName = declaration.split(', ')[0]
  return (
    <div className={ font } style={{ fontSize: '1.2em' }}>
      <h2>{ simpleName }</h2>
      <p>
        Regular, <strong>Bold,</strong> <em>Italic,</em> <strong><em>Bold Italic,</em></strong> [ɡlɪfwɜ˞ks]
        <br />
        <strong>CSS class name:</strong> .{ font }
      </p>
    </div>
  )
}

FontSample.propTypes = {
  /** The contents of the CSS style declaration */
  declaration: PropTypes.string,
  /** The key/name of the font */
  font: PropTypes.string,
}

export default FontSample
