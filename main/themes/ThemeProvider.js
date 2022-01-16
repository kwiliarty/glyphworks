import React from 'react'
import { ThemeProvider } from 'styled-components'
import PropTypes from 'prop-types'

import theme from './glyphworks'
import GlobalStyle from './GlobalStyle'

const Wrapper = props => (
  <React.Fragment>
    <ThemeProvider theme={ theme }>
      <GlobalStyle />
      { props.children }
    </ThemeProvider>
  </React.Fragment>
)

Wrapper.propTypes = { 
  /** Descendant components */
  children: PropTypes.object,
}

export default Wrapper
