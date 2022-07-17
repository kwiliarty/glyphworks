import React from 'react'
import { render, screen } from 'utils'
import Footer from './Footer.js'

describe( 'The Header component', () => {

  beforeAll(() => {
    jest.useFakeTimers()
    jest.setSystemTime( new Date( '3023-04-01' ).getTime() )
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it( 'displays the copyright year', () => {
    render( <Footer /> )
    const footer = screen.getByRole( 'contentinfo' )
    expect( footer ).toHaveTextContent( '3023' )
    expect( footer ).toMatchSnapshot()
  })

  it( 'displays an attribution to the IPA chart', () => {
    render( <Footer /> )
    const footer = screen.getByRole( 'contentinfo' )
    expect( footer ).toHaveTextContent( 'International Phonetic Association' )
  })

  it( 'can accept custom colors', () => {
    render(
      <Footer foreColor='wheat' backColor='pink' />
    )
    const footer = screen.getByRole( 'contentinfo' )
    expect( footer ).toHaveStyleRule('color', 'wheat')
    expect( footer ).toHaveStyleRule('background-color', 'pink')
    expect( footer ).toMatchSnapshot()
  })
})
