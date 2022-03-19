import React from 'react'
import { render, screen } from '@testing-library/react'
import Main from './Main.js'

describe( 'The Main component', () => {

  it( 'displays with a default text and background color', () => {
    render( <Main /> )
    const main = screen.getByRole( 'main' )
    expect( main ).toMatchSnapshot()
  })

  it( 'can accept custom colors', () => {
    render(
      <Main foreColor='wheat' backColor='pink' />
    )
    const main = screen.getByRole( 'main' )
    expect( main ).toHaveStyleRule('color', 'wheat')
    expect( main ).toHaveStyleRule('background-color', 'pink')
    expect( main ).toMatchSnapshot()
  })
})
