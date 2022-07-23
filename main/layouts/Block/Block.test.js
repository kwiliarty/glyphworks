import React from 'react'
import { render, screen } from 'utils'
import Block from './Block'

describe( 'The Block component', () => {
  it( 'should display a title prop', () => {
    render(
      <Block blockTitle='TestBlock' />
    )
    const block = screen.getByText( 'TestBlock' )
    expect( block ).toHaveTextContent( 'TestBlock' )
  })
})
