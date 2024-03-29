import React from 'react'
import { render, screen } from 'utils'
import userEvent from '@testing-library/user-event'
import TextInput from './TextInput.js'

describe( 'The TextInput component', () => {
  it( 'renders an input with a label', async () => {
    const user = userEvent.setup()
    render( <TextInput labelText='Testing' idStem='test' /> )
    const input = screen.getByLabelText( 'Testing' )
    await user.click( input )
    await user.keyboard('hello')
    expect( input ).toHaveValue( 'hello' )
    expect( input ).toMatchSnapshot()
  })

  it( 'optionally displays a suffix', () => {
    render(
      <TextInput labelText='Testing Suffix' idStem='test-suffix'>
        <TextInput.Suffix>
          <button>Groetjes!</button>
        </TextInput.Suffix>
      </TextInput>
    )
    const input = screen.getByLabelText( 'Testing Suffix')
    expect( input ).toHaveValue( '' )
    const suffix = screen.getByRole( 'button' )
    expect( suffix ).toHaveTextContent( 'Groetjes!' )
  })
})
