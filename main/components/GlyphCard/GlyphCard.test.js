import React from 'react'
import GlyphCard from './GlyphCard'
import { render, screen } from 'utils'

describe( 'A GlyphCard', () => {
  it( 'accepts and displays glyph attributes', () => {
    render(
      <GlyphCard
        glyph='p'
        ipaName='lower-case p'
        ipaDefinition='voiceless labial stop'
        slug='lower-case-p'
      />
    )
    const card = screen.getByText( 'p' )
    expect(card).toBeInTheDocument()
    const name = screen.getByText( 'lower-case p' )
    expect(name).toBeInTheDocument()
    const definition = screen.getByText( 'voiceless labial stop' )
    expect(definition).toBeInTheDocument()
    const link = screen.getByRole( 'link' )
    expect( link ).toBeInTheDocument()
    expect( link ).toHaveTextContent( 'lower-case p' )
    expect( link ).toHaveAttribute( 'href', 'glyphs/lower-case-p' )
  })
})
