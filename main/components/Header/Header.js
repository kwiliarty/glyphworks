import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import * as Strings from '../../strings'

import Ipa from '../Ipa'

const StyledHeader = styled.header`
  background-color: ${ props => props.theme.colors[ props.backColor ] || props.backColor };
  color: ${ props => props.theme.colors[ props.foreColor ] || props.foreColor };
  padding: ${ props => props.theme.basePadding };
  h1 {
    margin: 0;
    font-size: 2rem;
  }
`

const Header = props => {

  return (
    <StyledHeader backColor={ props.backColor } foreColor={ props.foreColor }>
      <h1>
        { props.mainTitle } <Ipa>{ props.ipaTitle }</Ipa>
      </h1>
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
  /** The IPA string to display in the title */
  ipaTitle: PropTypes.string,
}

Header.defaultProps = {
  backColor: 'darkRed',
  foreColor: 'veryLightBrown',
  ipaTitle: Strings.ipa_title,
  mainTitle: Strings.main_title,
}

export default Header
