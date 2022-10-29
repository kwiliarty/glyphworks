import React from 'react'
import { render, screen } from 'utils'
import { MockedProvider } from '@apollo/client/testing'
import { mocks } from './mocks'
import Glyphs from './Glyphs.js'
import * as Strings from '../../strings'

describe( 'The Glyphs Component', () => {
  it( 'includes an h1', () => {
    render(
      <MockedProvider mocks={ mocks } addTypename={ false }>
        <Glyphs />
      </MockedProvider>
    )
    const h1 = screen.getByRole( 'heading' )
    expect( h1 ).toBeInTheDocument()
    expect( h1 ).toHaveTextContent( Strings.glyphList )
  })

  it( 'displays a list of glyphs', async () => {
    render(
      <MockedProvider mocks={ mocks } addTypename={ false }>
        <Glyphs />
      </MockedProvider>
    )
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    const list = await screen.findByRole( 'list' )
    expect( list ).toBeInTheDocument()
    expect( list ).toHaveTextContent( 'p' )
    expect( list ).toHaveTextContent( 't' )
    expect( list ).toHaveTextContent( 'k' )
    const listItems = await screen.findAllByRole( 'listitem' )
    expect( listItems.length ).toBe( 3 )
    const links = await screen.findAllByRole( 'link' )
    expect( links.length ).toBe( mocks[0].result.data.glyphs.length )
  })
})
