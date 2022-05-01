import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App.js'
import * as Strings from '../../strings'

describe( 'The App Component', () => {
  it( 'includes a banner and heading', () => {
    render( <App /> )
    const banner = screen.getByRole( 'banner' )
    const heading = screen.getByRole( 'heading' )
    expect( banner ).toContainElement( heading )
    expect( heading ).toHaveTextContent( Strings.main_title )
    expect( heading ).toHaveTextContent( Strings.ipa_title )
  })
  it( 'includes an X-SAMPA to IPA converter', () => {
    render( <App /> )
    const main = screen.getByRole( 'main' )
    Strings.welcome_message.props.children
      .filter( child => { typeof child === 'string' })
      .forEach( child => {
        expect( main ).toHaveTextContent( child )
      })
  })
  it( 'includes a footer', () => {
    render( <App /> )
    const contentinfo = screen.getByRole( 'contentinfo' )
    expect( contentinfo ).toHaveTextContent( '©' )
  })
})
