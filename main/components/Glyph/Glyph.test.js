import React from 'react'
import { render, screen } from 'utils'
import { MockedProvider } from '@apollo/client/testing'
import { mocks } from './mocks'
import Glyph from './Glyph'
import * as Strings from '../../strings'

const renderGlyph = () => {
  render(
    <MockedProvider mocks={ mocks } addTypename={ false}>
      <Glyph slug='lower-case-p' />
    </MockedProvider>
  )
}

const glyph = mocks[0].result.data.glyph

describe( 'The Glyph Component', () => {
  it( 'includes an h1', async () => {
    renderGlyph()
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    const h1 = await screen.findByRole( 'heading' )
    expect( h1 ).toBeInTheDocument()
    expect( h1 ).toHaveTextContent( 'Lower-case p' )
  })

  it( 'displays details for a specific glyph', async () => {
    renderGlyph()
    const table = await screen.findByRole( 'table' )
    expect( table ).toBeInTheDocument()
    expect( table ).toHaveTextContent( Strings.ipaNameLabel )
    expect( table ).toHaveTextContent( Strings.ipaDefinitionLabel )
    expect( table ).toHaveTextContent( Strings.ipaNumberLabel )
    expect( table ).toHaveTextContent( Strings.hexCodeLabel )
    expect( table ).toHaveTextContent( Strings.combiningLabel )
    expect( table ).toHaveTextContent( glyph.ipaName )
    expect( table ).toHaveTextContent( glyph.ipaDefinition )
    expect( table ).toHaveTextContent( glyph.ipaNumber )
    expect( table ).toHaveTextContent( glyph.hexCode )
    expect( table ).toHaveTextContent( glyph.combining )
  })
})
