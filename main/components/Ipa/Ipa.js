import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.span`
  font-family: ${ props => props.theme.ipaFontFamily };
`

const Ipa = props => {
  return (
    <Wrapper>
      { props.children }
    </Wrapper>
  )
}

Ipa.propTypes = {
  /** This component renders its children. */
  children: PropTypes.node,
}

export default Ipa
