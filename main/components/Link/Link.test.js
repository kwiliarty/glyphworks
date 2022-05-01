import React from 'react'
import { render, screen } from '@testing-library/react'
import Link from './Link.js'

describe( 'The Link Component', () => {
  it( 'renders an anchor tag', () => {
    render( <Link href='https://glyph.works'>GlyphWorks</Link> )
    const link = screen.getByRole( 'link' )
    expect( link ).toHaveTextContent( 'GlyphWorks' )
    expect( link ).toHaveAttribute( 'href', 'https://glyph.works' )
    expect( link ).toMatchSnapshot()
  })
})
