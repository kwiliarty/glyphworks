import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import 'regenerator-runtime/runtime'
import IpaPairedInput from './IpaPairedInput.js'

describe( 'The IpaPairedInput component', () => {
  it( 'renders two inputs and two labels', () => {
    render( <IpaPairedInput /> )
    const inputs = screen.getAllByRole( 'textbox' )
    expect( inputs.length ).toBe( 2 )
  })

  it( 'converts X-SAMPA to IPA', async () => {
    const user = userEvent.setup()
    render( <IpaPairedInput /> )
    const xsampa = screen.getByLabelText( /sampa/i )
    const ipa = screen.getByLabelText( /ipa/i )
    await user.click( xsampa )
    await user.keyboard( 'O' )
    expect( ipa ).toHaveValue( 'ɔ' )
    await user.keyboard( '\\' )
    expect( ipa ).toHaveValue( 'ʘ' )
    await user.keyboard( 'TIN' )
    expect( ipa ).toHaveValue( 'ʘθɪŋ')
  })

  it( 'converts IPA to X-SAMPA', async () => {
    const user = userEvent.setup()
    render( <IpaPairedInput /> )
    const xsampa = screen.getByLabelText( /sampa/i )
    const ipa = screen.getByLabelText( /ipa/i )
    await user.click( ipa )
    await user.keyboard( 'ʘθɪŋ' )
    expect( xsampa ).toHaveValue( 'O\\TIN' )
  })
})
