import React from 'react'
import styled, { withTheme } from 'styled-components'

import theme from './glyphworks'

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

export default FontSample
