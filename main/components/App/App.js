import React from 'react'
import styled from 'styled-components'

import theme from '../../themes/glyphworks'
import GlobalStyle from '../../themes/GlobalStyle'

const Wrapper = styled.div`
`

const App = () => {
  return (
    <Wrapper>
      <GlobalStyle theme={ theme } />
      <h1>ɡlɪfwə˞ks</h1>
    </Wrapper>
  )
}

export default App
