import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledBlock = styled.div`
  background-color: rgb( 0, 0, 0, 0.1 );
  outline: 3px solid gray;
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
}

Block.defaultProps = {
  blockTitle: 'Set a blockTitle!',
  minHeight: '200px',
}

/** @component */
export default Block
