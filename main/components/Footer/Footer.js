import React from 'react'
import styled from 'styled-components'

const StyledFooter = styled.footer`
  background-color: ${ props => props.theme.footerBgColor };
  color: ${ props => props.theme.footerTextColor };
  padding: ${ props => props.theme.basePadding };
  font-size: ${ props => props.theme.smallFontSize };
`

const Footer = props => {
  return (
    <StyledFooter { ...props }>
      ©2022
    </StyledFooter>
  )
}

export default Footer
