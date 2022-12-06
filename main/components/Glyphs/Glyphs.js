import React from 'react'
import styled from 'styled-components'

import { useQuery, gql } from '@apollo/client'
import GlyphCard from '../GlyphCard'
import Page from '../../layouts/Page'
import * as Strings from '../../strings'

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

const List = () => {
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

const Glyphs = () => {
  return (
    <Page
      pageTitle={ Strings.glyph_list }
    >
      <List />
    </Page>
  )
}
Glyphs.List = List

export default Glyphs
