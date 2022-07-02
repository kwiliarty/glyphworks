import React from 'react'
import styled from 'styled-components'

import theme from '../../themes/glyphworks'
import GlobalStyle from '../../themes/GlobalStyle'

import { Routes, Route } from 'react-router-dom'

import Welcome from '../Welcome'
import Glyphs from '../Glyphs'
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
            <Routes>
              <Route path='/' element={ <Welcome /> } />
              <Route path='glyphs' element={ <Glyphs /> } />
            </Routes>
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
