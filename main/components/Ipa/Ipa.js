import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import theme from '../../themes/glyphworks'

const Wrapper = styled.span`
  display: inline-block;
  font-family: ${ theme.ipaFontFamily };
`

const Ipa = props => {
  return (
    <Wrapper theme={ theme }>
      { props.children }
    </Wrapper>
  )
}

Ipa.propTypes = {
  /** This component renders its children. */
  children: PropTypes.node,
}

export default Ipa
