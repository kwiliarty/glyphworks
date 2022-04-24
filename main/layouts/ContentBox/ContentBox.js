import React from 'react'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'

import theme from '../../themes/glyphworks'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  min-height: ${ props => props.minHeight };
`

const StyledTop = styled.div``

const StyledContents = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex: 1;
`

const StyledBottom = styled.div``

const ContentBox = props => {

  const { children } = props

  return (
    <Container { ...props }>
      <StyledTop { ...props }>
        { children.filter( child => child.type.nickname == 'Top' ) }
      </StyledTop>
      <StyledContents { ...props }>
        { children.filter( child => child.type.nickname == 'Contents' ) }
      </StyledContents>
      <StyledBottom { ...props }>
        { children.filter( child => child.type.nickname == 'Bottom' ) }
      </StyledBottom>
    </Container>
  )
}

const Top = props => props.children
Top.nickname = 'Top'
ContentBox.Top = Top

const Contents = props => props.children
Contents.nickname = 'Contents'
ContentBox.Contents = Contents

const Bottom = props => props.children
Bottom.nickname = 'Bottom'
ContentBox.Bottom = Bottom

ContentBox.propTypes = {
  /** This component will display children of its sub-components */
  children: PropTypes.node,
  /** A title for the block that will appear centered */
  blockTitle: PropTypes.string,
  /** A minimum height for the block */
  minHeight: PropTypes.string,
  /** A custom theme object. Generally you will not want to modify this. */
  theme: PropTypes.object,
}

ContentBox.defaultProps = {
  blockTitle: 'Set a blockTitle!',
  minHeight: '200px',
  theme: theme,
}

/** @component */
export default withTheme( ContentBox )
