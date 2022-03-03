import React from 'react'
import styled from 'styled-components' 

const StyledMain = styled.main`
  padding: ${ props => props.theme.basePadding }; 
`

const Main = props => {
  return (
    <StyledMain { ...props }>
      { props.children }
    </StyledMain>
  )
}

export default Main
