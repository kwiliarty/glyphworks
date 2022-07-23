import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Link from '../Link'

const StyledFooter = styled.footer`
  display: flex;
  background-color: ${ props => props.theme.colors[ props.backColor ] || props.backColor };
  color: ${ props => props.theme.colors[ props.foreColor ] || props.foreColor };
  font-size: ${ props => props.theme.smallFontSize };
`

const StyledChild = styled.div`
  margin: 1rem;
`

const Footer = props => {

  const date = new Date()

  return (
    <StyledFooter backColor={ props.backColor } foreColor={ props.foreColor }>
      <StyledChild>©{ date.getFullYear() }</StyledChild>
      <StyledChild>
        Note that the <Link color='darkPurple' href='http://www.internationalphoneticassociation.org/content/ipa-chart'>IPA Chart</Link> is available under a Creative Commons Attribution-Sharealike 3.0 Unported License. Copyright © 2015 International Phonetic Association.
      </StyledChild>
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
