import React from 'react'
import { render, screen, within } from 'utils'
import App from './App.js'
import * as Strings from '../../strings'

const AppWithRouter = () => {
  return (
    <App />
  )
}

describe( 'The App Component', () => {
  it( 'includes a banner and heading', () => {
    render( AppWithRouter() )
    const banner = screen.getByRole( 'banner' )
    const heading = within(banner).getByRole( 'link' )
    expect( banner ).toContainElement( heading )
    expect( heading ).toHaveTextContent( Strings.mainTitle )
  })
  it( 'includes a <Welcome> component', () => {
    render( AppWithRouter() )
    const main = screen.getByRole( 'main' )
    Strings.welcomeMessage.props.children
      .filter( child => { typeof child === 'string' })
      .forEach( child => {
        expect( main ).toHaveTextContent( child )
      })
  })
  it( 'includes a footer', () => {
    render( AppWithRouter() )
    const contentinfo = screen.getByRole( 'contentinfo' )
    expect( contentinfo ).toHaveTextContent( '©' )
  })
})
