import React from 'react'
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

export default Ipa
