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
import Link from '../Link'

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
                Welcome to <Ipa>[ɡlɪfwɜ˞ks]</Ipa>! Convert <Link href='https://en.wikipedia.org/wiki/X-SAMPA'>X-SAMPA</Link> to <Link href='https://en.wikipedia.org/wiki/International_Phonetic_Alphabet'>IPA</Link> or vice versa.
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
