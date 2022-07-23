import React from 'react'
import styled from 'styled-components'

import { NavLink } from 'react-router-dom'

const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  background-color: ${ props => props.theme.colors.lightBrown };
  width: 100%;
`

const StyledNavElement = styled.div`
  font-size: 1.4rem;
  margin: 0 0.5rem;
  a, a:hover, a:focus, a:active, a:visited {
    color: ${ props => props.theme.colors.darkRed };
    display: block;
    margin-top: 3px;
    padding-bottom: 4px;
    position: relative;
    text-decoration: none;
    &:focus {
      outline: 2px dotted ${ props => props.theme.colors.darkRed };
    }
    &::after {
      display: block;
      height: 0;
      width: 100%;
      background-color: ${ props => props.theme.colors.darkRed };
      content: '';
      position: absolute;
      bottom: 0;
      transition: height 0.1s linear;
    }
    &.active::after {
      height: 4px;
    }
    &:hover::after {
      height: 6px;
    }
  }
`

const MainNav = () => {
  return(
    <StyledNav>
      <StyledNavElement>
        <NavLink to='/'>Home</NavLink>
      </StyledNavElement>
      <StyledNavElement>
        <NavLink to='/glyphs'>Glyphs</NavLink>
      </StyledNavElement>
    </StyledNav>
  )
}

export default MainNav
