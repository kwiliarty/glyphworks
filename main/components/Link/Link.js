import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import theme from '../../themes/glyphworks'

const StyledLink = styled.a`
  display: inline-block;
  color: ${ theme.colors.lightPurple };
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
}

export default Link
