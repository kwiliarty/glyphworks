import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import * as Strings from '../../strings'

const StyledHeader = styled.header`
  background-color: ${ props => props.theme.colors[ props.backColor ] || props.backColor };
  color: ${ props => props.theme.colors[ props.foreColor ] || props.foreColor };
  padding: ${ props => props.theme.basePadding };
  a, a:hover, a:focus, a:active, a:visited {
    display: block
    margin: 0;
    font-size: 2rem;
    color: inherit;
    text-decoration: none;
    &:focus {
      outline: 2px dotted ${ props => props.theme.colors[ props.foreColor ] || props.foreColor };
    }
  }
`

const Header = props => {

  return (
    <StyledHeader backColor={ props.backColor } foreColor={ props.foreColor }>
      <Link to='/'>
        { props.mainTitle }
      </Link>
    </StyledHeader>
  )
}

Header.propTypes = {
  /** The background color for the header, the name of a color from the theme */
  backColor: PropTypes.string,
  /** The foreground color for the header, the name of a color from the theme */
  foreColor: PropTypes.string,
  /** The main string to display in the title */
  mainTitle: PropTypes.string,
}

Header.defaultProps = {
  backColor: 'darkRed',
  foreColor: 'veryLightBrown',
  mainTitle: Strings.mainTitle,
}

export default Header
