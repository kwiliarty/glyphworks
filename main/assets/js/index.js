import React from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
  concat,
} from '@apollo/client'

import { BrowserRouter } from 'react-router-dom'

import Cookies from 'js-cookie'

import App from '../../components/App'
import theme from '../../themes/glyphworks'

const httpLink = new HttpLink({
  uri: '/graphql',
  credentials: 'same-origin',
})

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = Cookies.get('csrftoken') || ''
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      'x-csrftoken': token,
    }
  }))
  return forward(operation)
})

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
})

const container = document.getElementById( 'app' )
const root = createRoot( container )

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={ client }>
        <ThemeProvider theme={ theme }>
          <App />
        </ThemeProvider>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
)
