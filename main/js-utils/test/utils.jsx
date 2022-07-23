import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import theme from '../../themes/glyphworks'
import { MemoryRouter } from 'react-router-dom'

const AllTheProviders = ({children}) => {
  return (
    <ThemeProvider theme={ theme }>
      <MemoryRouter>
        {children}
      </MemoryRouter>
    </ThemeProvider>
  )
}

const customRender = (ui, options) => {
  render(ui, { wrapper: AllTheProviders, ...options })
}

export * from '@testing-library/react'

export {customRender as render}
