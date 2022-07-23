import React from 'react'
import Ipa from './Ipa'
import { render, screen } from 'utils'

describe( 'An Ipa component', () => {
  it( 'displays its children in an IPA font', () => {
    render(
      <Ipa>test</Ipa>
    )
    const ipa = screen.getByText('test')
    expect( ipa ).toMatchSnapshot()
  })
})
