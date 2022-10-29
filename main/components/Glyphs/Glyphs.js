import React from 'react'
import styled from 'styled-components'

import { useQuery, gql } from '@apollo/client'
import GlyphCard from '../GlyphCard'
import Page from '../../layouts/Page'
import * as Strings from '../../strings'

const Wrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 1rem;
  padding: 0;
`

const Item = styled.li`
  list-style-type: none;
`

export const GET_GLYPHS = gql`
  query getGlyphs {
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
            <Item key={ glyph.slug }>
              <GlyphCard
                glyph={ glyph.glyph }
                ipaName={ glyph.ipaName }
                ipaDefinition={ glyph.ipaDefinition }
                slug={ glyph.slug }
              />
            </Item>  
          )
        })
      }
    </Wrapper>
  )
}

const Glyphs = () => {
  return (
    <Page
      pageTitle={ Strings.glyphList }
    >
      <List />
    </Page>
  )
}
Glyphs.List = List

export default Glyphs
