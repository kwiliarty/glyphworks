import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Glyph = styled.div`
  width: ${ props => props.width };
  min-width: ${ props => props.width };
  height: ${ props => props.width };
  border-radius: ${ props => props.theme.borderRadius };
  background-color: ${ props => props.theme.colors[props.bColor] };
  color: ${ props => props.theme.colors[props.color] };
  margin: 0.5rem;
  padding-top: 0.1em;
  padding-bottom: 0.2em;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: calc(${ props => props.width } * 0.8);
`

const GlyphChip = props => {
  const { glyph } = props
  return (
    <Glyph { ...props }>
      { glyph }
    </Glyph>
  )
}

GlyphChip.propTypes = {
  /** A background color name */
  bColor: PropTypes.string,
  /** A foreground color name */
  color: PropTypes.string,
  /** A string to be displayed as a glyph */
  glyph: PropTypes.string,
  /** A CSS size description */
  width: PropTypes.string,
}

GlyphChip.defaultProps = {
  bColor: 'darkRed',
  color: 'veryLightBrown',
  glyph: '',
  width: '5rem',
}

export default GlyphChip
