import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { colors } from './glyphworks'

const Box = styled.div`
  background-color: ${ props => colors[ props.color ] };
  border: 1px solid black;
  border-radius: 2px;
  margin: 1rem auto;
  padding: 1rem;
`

const Text = styled.span`
  background-color: white;
  border-radius: 2px;
  color: black;
  opacity: 0.9;
  padding: 0.25rem 0.5rem;
  font-family: monospace;
`

const Swatches = ( props ) => {
  return (
    <Box color={ props.color }>
      <Text>{ props.color } — { colors[ props.color ] }</Text>
    </Box>
  )
}

Swatches.propTypes = {
  /**
   * The Swatches color
   *
   * @ignore
   */
  color: PropTypes.string,
}

Swatches.defaultProps = {
  color: 'transparent',
}

/** @component */
export default Swatches
