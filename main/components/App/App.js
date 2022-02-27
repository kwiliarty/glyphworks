import React from 'react'
import styled from 'styled-components'

import theme from '../../themes/glyphworks'
import GlobalStyle from '../../themes/GlobalStyle'

import Ipa from '../Ipa'

const Wrapper = styled.div`
`

const App = () => {
  return (
    <Wrapper>
      <GlobalStyle theme={ theme } />
      <h1>
        <Ipa>[ɡlɪfwɜ˞ks]</Ipa>
      </h1>
      <p>
        Welcome to <Ipa>[ɡlɪfwɜ˞ks]</Ipa>! Not much to see here yet, but we're working on it.
      </p>
    </Wrapper>
  )
}

export default App
