import React from 'react'
import PropTypes from 'prop-types'
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

Main.propTypes = {
  /** This component renders its children */
  children: PropTypes.node,
}

export default Main
