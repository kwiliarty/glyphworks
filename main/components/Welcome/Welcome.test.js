import React from 'react'
import { render, screen } from 'utils'
import Welcome from './Welcome.js'

describe( 'The welcome page', () => {
  it( 'includes an X-SAMPA to IPA converter', () => {
    render( <Welcome /> )
    const xSampaLink = screen.getByRole( 'link', { name: 'X-SAMPA'})
    expect( xSampaLink ).toBeInTheDocument()
    const ipaLink = screen.getByRole( 'link', { name: 'IPA'})
    expect( ipaLink ).toBeInTheDocument()
    const xSampaInput = screen.getByRole( 'textbox', { name: 'X-SAMPA'})
    expect( xSampaInput ).toBeInTheDocument()
    const ipaInput = screen.getByRole( 'textbox', { name: 'IPA'})
    expect( ipaInput ).toBeInTheDocument()
  })
})
