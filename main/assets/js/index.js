import React from 'react'
import ReactDOM from 'react-dom'
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

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={ client }>
        <ThemeProvider theme={ theme }>
          <App />
        </ThemeProvider>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('app')
)
