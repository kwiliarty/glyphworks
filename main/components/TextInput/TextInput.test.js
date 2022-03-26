import React from 'react'
import { render, screen } from '@testing-library/react'
import TextInput from './TextInput.js'
import 'jest-styled-components'

describe( 'The TextInput component', () => {

  it( 'renders an input with a label', () => {
    render( <TextInput labelText='Testing' idStem='test' /> )
    const input = screen.getByRole( 'textbox' )
    expect( input ).toMatchSnapshot()
  })
})
