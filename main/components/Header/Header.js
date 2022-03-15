import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import theme from '../../themes/glyphworks'

import Ipa from '../Ipa'

const StyledHeader = styled.header`
  background-color: ${ props => props.backColor };
  color: ${ props => props.foreColor };
  padding: ${ props => props.theme.basePadding };
  h1 {
    margin: 0;
    font-size: 2rem;
  }
`

const Header = props => {

  const backColor = theme.colors[ props.backColor ] || theme.colors[ 'black' ]
  const foreColor = theme.colors[ props.foreColor ] || theme.colors[ 'white' ]

  return (
    <StyledHeader backColor={ backColor } foreColor={ foreColor }>
      <h1>
        <Ipa>[ɡlɪfwɜ˞ks]</Ipa>
      </h1>
    </StyledHeader>
  )
}

Header.propTypes = {
  /** The background color for the header, the name of a color from the theme */
  backColor: PropTypes.string,
  /** The foreground color for the header, the name of a color from the theme */
  foreColor: PropTypes.string,
}

Header.defaultProps = {
  backColor: 'darkRed',
  foreColor: 'veryLightBrown',
}

export default Header
