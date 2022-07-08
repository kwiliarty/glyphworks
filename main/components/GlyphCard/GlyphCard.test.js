import React from 'react'
import GlyphCard from './GlyphCard.js'
import { render, screen } from 'utils'

describe( 'A GlyphCard', () => {
  it( 'accepts and displays glyph attributes', () => {
    render(
      <GlyphCard
        glyph='p'
        ipaName='lower-case p'
        ipaDefinition='voiceless labial stop'
      />
    )
    const card = screen.getByText('p')
    expect(card).toBeInTheDocument()
    const name = screen.getByText('lower-case p')
    expect(name).toBeInTheDocument()
    const definition = screen.getByText('voiceless labial stop')
    expect(definition).toBeInTheDocument()
  })
})
