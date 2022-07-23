import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components' 

import theme from '../../themes/glyphworks'

const StyledMain = styled.main`
  background-color: ${ props => props.theme.colors[ props.backColor ] || props.backColor };
  color: ${ props => props.theme.colors[ props.foreColor ] || props.foreColor };
  padding: ${ props => props.theme.basePadding }; 
  flex-grow: 1;
  max-width: 800px;
`

const Main = props => {
  return (
    <StyledMain { ...props } backColor={ props.backColor } foreColor={ props.foreColor }>
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
