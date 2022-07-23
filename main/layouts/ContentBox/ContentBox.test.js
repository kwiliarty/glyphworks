import React from 'react'
import { render, screen } from 'utils'
import ContentBox from './ContentBox'

describe( 'The ContentBox component', () => {
  it( 'displays a three-part vertical layout', () => {
    render(
      <ContentBox>
        <ContentBox.Top>
          Top
        </ContentBox.Top>
        <ContentBox.Contents>
          Contents
        </ContentBox.Contents>
        <ContentBox.Bottom>
          Bottom
        </ContentBox.Bottom>
      </ContentBox>
    )
    const top = screen.getByText( 'Top' )
    expect( top ).toBeInTheDocument()
    const contents = screen.getByText( 'Contents' )
    expect( contents ).toBeInTheDocument()
    const bottom = screen.getByText( 'Bottom' )
    expect( bottom ).toBeInTheDocument()
  })
})
