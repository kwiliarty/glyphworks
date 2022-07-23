import React from 'react'
import { render, screen } from 'utils'
import MainNav from './MainNav'

describe( 'The MainNav component', () => {

  it( 'displays links to top-level pages', () => {
    render( <MainNav /> )
    const nav = screen.getByRole( 'navigation' )
    expect( nav ).toHaveTextContent( 'Home' )
    expect( nav ).toHaveTextContent( 'Glyphs' )
    expect( nav ).toMatchSnapshot()
  })
})
