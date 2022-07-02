import React from 'react'
import styled from 'styled-components'

import { useQuery, gql } from '@apollo/client'

const Wrapper = styled.div`
  ul {
    list-style-type: none;
  }
`

export const GET_GLYPHS = gql`
  {
    glyphs {
      glyph
      slug
    }
  }
`

const Glyphs = () => {
  const { loading, error, data } = useQuery(GET_GLYPHS)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :-/</p>

  return (
    <Wrapper>
      <ul>
        {
          data.glyphs.map(({ glyph, slug }) => {
            return (
              <li key={ slug }>{ glyph }</li>  
            )
          })
        }
      </ul>
    </Wrapper>
  )
}

export default Glyphs
