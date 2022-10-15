import React from 'react'
import IpaPairedInput from './IpaPairedInput'
import * as utils from '../ClipboardCopy/utils'
import { render, screen } from 'utils'
import userEvent from '@testing-library/user-event'

describe( 'An IpaPairedInput', () => {
  it( 'displays two inputs, each with copy buttons', async () => {
    const user = userEvent.setup()
    const spy = jest.spyOn( utils, 'copyTextToClipboard' )
    render(
      <IpaPairedInput />
    )
    const xsampaInput = screen.getByLabelText( 'X-SAMPA' )
    const ipaInput = screen.getByLabelText( 'IPA' )
    const copyXsampaButton = screen.getByText( 'Copy X-SAMPA' )
    const copyIpaButton = screen.getByText( 'Copy IPA' )
    await user.click( xsampaInput )
    await user.keyboard( 'TINk' )
    expect( ipaInput.value ).toBe( 'θɪŋk' )
    await user.click( copyXsampaButton )
    expect( spy ).toHaveBeenCalledWith( 'TINk' )
    await user.click( copyIpaButton )
    expect( spy ).toHaveBeenCalledWith( 'θɪŋk' )
  })
})
