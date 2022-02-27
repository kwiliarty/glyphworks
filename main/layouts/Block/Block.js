import React from 'react'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'

import theme from '../../themes/glyphworks'

const StyledBlock = styled.div`
  background-color: rgb( 255, 0, 0, 0.2 );
  outline: 3px solid red;
  color: black;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  min-height: ${ props => props.minHeight };
  margin: 0;
  padding: 0;
  width: 100%;
  .blocktitle {
    font-weight: bold;
  }
`

const Block = props => {

  return (
    <StyledBlock
      minHeight={ props.minHeight }
    >
      <div className='blocktitle'>{ props.blockTitle }</div>
    </StyledBlock>
  )
}

Block.propTypes = {
  /** A title for the block that will appear centered */
  blockTitle: PropTypes.string,
  /** A minimum height for the block */
  minHeight: PropTypes.string,
  /** A custom theme object. Generally you will not want to modify this. */
  theme: PropTypes.object,
}

Block.defaultProps = {
  blockTitle: 'Set a blockTitle!',
  minHeight: '200px',
  theme: theme,
}

/** @component */
export default withTheme( Block )
