import React from 'react'
import 'regenerator-runtime/runtime'
import { render, screen, waitFor } from 'utils'
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
    expect( h1 ).toHaveTextContent( Strings.glyph_list )
  })
  it( 'displays a list of glyphs', async () => {
    render(
      <MockedProvider mocks={ mocks } addTypename={ false }>
        <Glyphs />
      </MockedProvider>
    )
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    waitFor(() => {
      screen.getByRole( 'list' )
      const list = screen.getByRole( 'list' )
      expect( list ).toBeInTheDocument()
      expect( list ).toHaveTextContent( 'p' )
      expect( list ).toHaveTextContent( 't' )
      expect( list ).toHaveTextContent( 'k' )
      const listItems = screen.getAllByRole( 'listitem' )
      expect( listItems.length ).toBe( 3 )
    })
  })
})
