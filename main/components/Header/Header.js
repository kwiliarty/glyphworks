import React from 'react'
import styled from 'styled-components'

import Ipa from '../Ipa'

const StyledHeader = styled.header`
  background-color: ${ props => props.theme.headerBgColor };
  color: ${ props => props.theme.headerTextColor };
  padding: ${ props => props.theme.basePadding };
  h1 {
    margin: 0;
    font-size: 2rem;
  }
`

const Header = props => {
  return (
    <StyledHeader { ...props }>
      <h1>
        <Ipa>[ɡlɪfwɜ˞ks]</Ipa>
      </h1>
    </StyledHeader>
  )
}

export default Header
