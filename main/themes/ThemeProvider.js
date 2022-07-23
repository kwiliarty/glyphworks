import React from 'react'
import { ThemeProvider } from 'styled-components'
import PropTypes from 'prop-types'

import theme from './glyphworks'
import GlobalStyle from './GlobalStyle'
import { MemoryRouter } from 'react-router-dom'

const Wrapper = props => (
  <React.Fragment>
    <ThemeProvider theme={ theme }>
      <MemoryRouter>
        <GlobalStyle />
        { props.children }
      </MemoryRouter>
    </ThemeProvider>
  </React.Fragment>
)

Wrapper.propTypes = { 
  /** Descendant components */
  children: PropTypes.object,
}

export default Wrapper
