import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import theme from '../../themes/glyphworks'

const StyledFooter = styled.footer`
  background-color: ${ props => props.backColor };
  color: ${ props => props.foreColor };
  padding: ${ props => props.theme.basePadding };
  font-size: ${ props => props.theme.smallFontSize };
`

const Footer = props => {

  const backColor = theme.colors[ props.backColor ] || props.backColor
  const foreColor = theme.colors[ props.foreColor ] || props.foreColor
  const date = new Date()

  return (
    <StyledFooter backColor={ backColor } foreColor={ foreColor }>
      ©{ date.getFullYear() }
    </StyledFooter>
  )
}

Footer.propTypes = {
  /** The background color, the name of a color from the theme */
  backColor: PropTypes.string,
  /** The component's children */
  children: PropTypes.node,
  /** The foreground color, the name of a color from the theme */
  foreColor: PropTypes.string,
}

Footer.defaultProps = {
  backColor: 'lightBrown',
  foreColor: 'darkRed',
}

export default Footer
