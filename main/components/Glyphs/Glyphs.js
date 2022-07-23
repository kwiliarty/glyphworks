import React, { useEffect } from 'react'
import styled from 'styled-components'

import { useQuery, gql } from '@apollo/client'
import GlyphCard from '../GlyphCard'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 1rem;
`

export const GET_GLYPHS = gql`
  {
    glyphs {
      glyph
      slug
      ipaName
      ipaDefinition
    }
  }
`

const Glyphs = () => {
  useEffect(() => {
    document.title = 'Glyph List : GlyphWorks'
  }, [])

  useEffect(() => {
    const wrapper = document.getElementById('app')
    if ( wrapper ) {
      wrapper.focus()
    }
  }, [])

  const { loading, error, data } = useQuery(GET_GLYPHS)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :-/</p>

  return (
    <Wrapper>
      {
        data.glyphs.map(glyph => {
          return (
            <div key={ glyph.slug }>
              <GlyphCard
                glyph={ glyph.glyph }
                ipaName={ glyph.ipaName }
                ipaDefinition={ glyph.ipaDefinition }
              />
            </div>  
          )
        })
      }
    </Wrapper>
  )
}

export default Glyphs
