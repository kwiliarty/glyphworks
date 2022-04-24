import React from 'react'
import styled from 'styled-components'

import theme from '../../themes/glyphworks'
import GlobalStyle from '../../themes/GlobalStyle'

import Ipa from '../Ipa'
import IpaPairedInput from '../IpaPairedInput'
import ContentBox from '../../layouts/ContentBox'
import Header from '../Header'
import Main from '../Main'
import Footer from '../Footer'

const Wrapper = styled.div`
  background-color: ${theme.colors.parchment};
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
                Welcome to <Ipa>[ɡlɪfwɜ˞ks]</Ipa>!
                You can use the inputs below to convert X-SAMPA to IPA or vice versa.
              </p>
              <IpaPairedInput />
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
