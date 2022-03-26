import React from 'react'
import { render, screen } from '@testing-library/react'
import IpaPairedInput from './IpaPairedInput.js'

describe( 'The IpaPairedInput component', () => {

  it( 'renders two inputs and two labels', () => {
    render( <IpaPairedInput /> )
    const inputs = screen.getAllByRole( 'textbox' )
    expect( inputs.length ).toBe( 2 )
  })
})
