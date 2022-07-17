import React from 'react'
import { render, screen } from 'utils'
import Header from './Header.js'
import * as Strings from '../../strings'

describe( 'The Header component', () => {
  it( 'can display a default title', () => {
    render( <Header /> )
    const banner = screen.getByRole( 'banner' )
    expect( banner ).toHaveTextContent( Strings.main_title )
    expect( banner ).toHaveTextContent( Strings.ipa_title )
    expect( banner ).toMatchSnapshot()
  })

  it( 'can display a custom title', () => {
    render( <Header mainTitle='Custom Title' ipaTitle='some IPA' /> )
    const banner = screen.getByRole( 'banner' )
    expect( banner ).toHaveTextContent( 'Custom Title' )
    expect( banner ).toHaveTextContent( 'some IPA' )
    expect( banner ).toMatchSnapshot()
  })

  it( 'can accept custom colors', () => {
    render(
      <Header foreColor='wheat' backColor='pink' />
    )
    const banner = screen.getByRole( 'banner' )
    expect( banner ).toHaveStyleRule('color', 'wheat')
    expect( banner ).toHaveStyleRule('background-color', 'pink')
    expect( banner ).toMatchSnapshot()
  })
})
