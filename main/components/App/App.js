import React from 'react'
import styled from 'styled-components'

import theme from '../../themes/glyphworks'
import GlobalStyle from '../../themes/GlobalStyle'

import Ipa from '../Ipa'
import ContentBox from '../../layouts/ContentBox'
import Header from '../Header'
import Main from '../Main'
import Footer from '../Footer'

const Wrapper = styled.div`
`

const App = () => {
  return (
    <Wrapper>
      <GlobalStyle theme={ theme } />
        <ContentBox minHeight='100vh'>
          <ContentBox.Top>
            <Header />
          </ContentBox.Top>
          <ContentBox.Contents>
            <Main>
              <p>
                Welcome to <Ipa>[ɡlɪfwɜ˞ks]</Ipa>! Not much to see here yet, but we're working on it.
              </p>
            </Main>
          </ContentBox.Contents>
          <ContentBox.Bottom>
            <Footer />
          </ContentBox.Bottom>
        </ContentBox>
    </Wrapper>
  )
}

export default App
