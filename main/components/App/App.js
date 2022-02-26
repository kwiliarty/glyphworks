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
      <h2>ɡlɪfwə˞ks</h2>
      <h3>ɡlɪfwə˞ks</h3>
      <h4>ɡlɪfwə˞ks</h4>
      <p>ɡlɪfwə˞ks</p>
    </Wrapper>
  )
}

export default App
