import React from 'react'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'

import theme from '../../themes/glyphworks'

const Container = styled.div`
`

const StyledHeader = styled.div``

const StyledBody = styled.div``

const StyledFooter = styled.div``

const HeaderBodyFooter = props => {

  const { children } = props

  return (
    <Container { ...props }>
      <StyledHeader { ...props }>
        { children.filter( child => child.type.nickname == 'Header' ) }
      </StyledHeader>
      <StyledBody { ...props }>
        { children.filter( child => child.type.nickname == 'Body' ) }
      </StyledBody>
      <StyledFooter { ...props }>
        { children.filter( child => child.type.nickname == 'Footer' ) }
      </StyledFooter>
    </Container>
  )
}

const Header = props => props.children
Header.nickname = 'Header'
HeaderBodyFooter.Header = Header

const Body = props => props.children
Body.nickname = 'Body'
HeaderBodyFooter.Body = Body

const Footer = props => props.children
Footer.nickname = 'Footer'
HeaderBodyFooter.Footer = Footer

HeaderBodyFooter.propTypes = {
  /** A title for the block that will appear centered */
  blockTitle: PropTypes.string,
  /** A minimum height for the block */
  minHeight: PropTypes.string,
  /** A custom theme object. Generally you will not want to modify this. */
  theme: PropTypes.object,
}

HeaderBodyFooter.defaultProps = {
  blockTitle: 'Set a blockTitle!',
  minHeight: '200px',
  theme: theme,
}

/** @component */
export default withTheme( HeaderBodyFooter )
