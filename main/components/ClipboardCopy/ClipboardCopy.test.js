import React from 'react'
import ClipboardCopy from './ClipboardCopy'
import * as utils from './utils'
import { render, screen } from 'utils'
import userEvent from '@testing-library/user-event'

describe( 'A ClipboardCopy component', () => {
  it( 'copies the contents of the text prop to the clipboard', async () => {
    const user = userEvent.setup()
    const spy = jest.spyOn( utils, 'copyTextToClipboard' )
    render(
      <ClipboardCopy
        text='Copy Cat!'
        hint='Click to copy'
      />
    )
    const copyButton = screen.getByText( 'Click to copy' )
    await user.click( copyButton )
    expect( spy ).toBeCalledTimes( 1 )
    expect( spy ).toHaveBeenCalledWith( 'Copy Cat!' )
  })
})
