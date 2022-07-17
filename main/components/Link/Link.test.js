import React from 'react'
import { render, screen } from 'utils'
import Link from './Link.js'
import theme from 'glyphworks'

describe( 'The Link Component', () => {
  it( 'renders an anchor tag', () => {
    render( <Link href='https://glyph.works'>GlyphWorks</Link> )
    const link = screen.getByRole( 'link' )
    expect( link ).toHaveTextContent( 'GlyphWorks' )
    expect( link ).toHaveAttribute( 'href', 'https://glyph.works' )
    expect( link ).toMatchSnapshot()
  })

  it( 'accepts a color attribute', () => {
    render(
      <Link
        href='https://glyph.works'
        color='darkRed'
      >
        Custom color
      </Link>
    )
    const link = screen.getByRole( 'link' )
    expect( link ).toHaveTextContent( 'Custom' )
    expect( link ).toHaveStyleRule('color', theme.colors.darkRed )
    expect( link ).toMatchSnapshot()
  })
})
