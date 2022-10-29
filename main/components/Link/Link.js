import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledLink = styled.a`
  color: ${ props => props.theme.colors[props.color] };
  &:focus {
    outline: 2px dotted;
  }
  &:hover {
    outline: 1px dotted;
  }
`

const Link = props => {
  return (
    <StyledLink { ...props }>
      { props.children }
    </StyledLink>
  )
}

Link.propTypes = {
  /** This component renders its children. */
  children: PropTypes.node,
  /** A theme color */
  color: PropTypes.string,
}

Link.defaultProps = {
  color: 'lightPurple',
}

export default Link
