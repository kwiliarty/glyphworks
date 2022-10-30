import React from 'react'
import { render, screen } from 'utils'
import Page from './Page.js'

describe( 'The Page layout', () => {
  it( 'includes an h1', () => {
    render(
      <Page pageTitle='Example' h1='Heading 1'>
        Page contents
      </Page>
    )
    const h1 = screen.getByRole( 'heading' )
    expect( h1 ).toBeInTheDocument()
    expect( h1 ).toHaveTextContent( 'Heading 1' )
  })
  it( 'renders its children', () => {
    render(
      <main>
        <Page pageTitle='Example' h1='Heading 1'>
          Page contents
        </Page>
      </main>
    )
    const main = screen.getByRole( 'main' )
    expect( main ).toHaveTextContent( 'Page contents' )
  })
  it( 'uses the pageTitle as h1 if h1 is null', () => {
    render(
      <Page pageTitle='Example'>
        Page contents
      </Page>
    )
    const h1 = screen.getByRole( 'heading' )
    expect( h1 ).toBeInTheDocument()
    expect( h1 ).toHaveTextContent( 'Example' )
  })
})
