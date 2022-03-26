import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components' 

import theme from '../../themes/glyphworks'

const StyledMain = styled.main`
  background-color: ${ props => props.backColor };
  color: ${ props => props.foreColor };
  padding: ${ props => props.theme.basePadding }; 
  flex-grow: 1;
`

const Main = props => {
  const backColor = theme.colors[ props.backColor ] || props.backColor
  const foreColor = theme.colors[ props.foreColor ] || props.foreColor

  return (
    <StyledMain { ...props } backColor={ backColor } foreColor={ foreColor }>
      { props.children }
    </StyledMain>
  )
}

Main.propTypes = {
  /** The background color, the name of a color from the theme */
  backColor: PropTypes.string,
  /** This component renders its children */
  children: PropTypes.node,
  /** The foreground color, the name of a color from the theme */
  foreColor: PropTypes.string,
}

Main.defaultProps = {
  backColor: 'parchment',
  foreColor: theme.mainTextColor,
}

export default Main
