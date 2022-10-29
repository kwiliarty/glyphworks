import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import GlobalStyle from '../../themes/GlobalStyle'

import { Routes, Route } from 'react-router-dom'

import Welcome from '../Welcome'
import Glyphs from '../Glyphs'
import Glyph from '../Glyph'
import ContentBox from '../../layouts/ContentBox'
import Header from '../Header'
import Main from '../Main'
import MainNav from '../MainNav'
import Footer from '../Footer'

const Wrapper = styled.div`
  background-color: ${ props => props.theme.colors.parchment };
`

const App = props => {
  return (
    <Wrapper>
      <GlobalStyle theme={ props.theme } />
      <ContentBox minHeight='100vh'>
        <ContentBox.Top>
          <Header />
          <MainNav />
        </ContentBox.Top>
        <ContentBox.Contents>
          <Main>
            <Routes>
              <Route index element={ <Welcome /> } />
              <Route path='glyphs' element={ <Glyphs /> } />
              <Route path='glyphs/:slug' element={ <Glyph /> } />
              <Route path='*' element={ <div>no match</div> } />
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

App.propTypes = {
  /** A theme object, should be provided by ThemeProvider */
  theme: PropTypes.object,
}

export default App
