import React from 'react'
import GlyphChip from './GlyphChip'
import { render, screen } from 'utils'
import theme from 'glyphworks'

describe( 'A GlyphChip', () => {
  it( 'features a glyph', () => {
    render(
      <GlyphChip glyph='p' />
    )
    const chip = screen.getByText( 'p' )
    expect( chip ).toBeInTheDocument()
    expect( chip ).toMatchSnapshot()
  })
  it( 'accepts a width prop', () => {
    render(
      <GlyphChip glyph='t' width='3rem' />
    )
    const chip = screen.getByText( 't' )
    expect( chip ).toHaveStyleRule( 'width', '3rem' )
    expect( chip ).toHaveStyleRule( 'height', '3rem' )
    expect( chip ).toHaveStyleRule( 'height', '3rem' )
    expect( chip ).toMatchSnapshot()
  })
  it( 'accepts color and bColor props', () => {
    render(
      <GlyphChip glyph='k' color='darkGreen' bColor='veryLightGreen' />
    )
    const chip = screen.getByText( 'k' )
    expect( chip ).toHaveStyleRule( 'color', theme.colors.darkGreen )
    expect( chip ).toHaveStyleRule( 'background-color', theme.colors.veryLightGreen )
    expect( chip ).toMatchSnapshot()
  })
})
