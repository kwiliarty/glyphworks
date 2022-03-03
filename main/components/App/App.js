import React from 'react'
import styled from 'styled-components'

import theme from '../../themes/glyphworks'
import GlobalStyle from '../../themes/GlobalStyle'

import Ipa from '../Ipa'
import ContentBox from '../../layouts/ContentBox'

const Wrapper = styled.div`
`

const App = () => {
  return (
    <Wrapper>
      <GlobalStyle theme={ theme } />
        <ContentBox minHeight='100vh'>
          <ContentBox.Top>
            <h1>
              <Ipa>[ɡlɪfwɜ˞ks]</Ipa>
            </h1>
          </ContentBox.Top>
          <ContentBox.Contents>
            <p>
              Welcome to <Ipa>[ɡlɪfwɜ˞ks]</Ipa>! Not much to see here yet, but we're working on it.
            </p>
          </ContentBox.Contents>
          <ContentBox.Bottom>
            Copyright 2022
          </ContentBox.Bottom>
        </ContentBox>
    </Wrapper>
  )
}

export default App
