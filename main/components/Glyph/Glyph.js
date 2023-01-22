import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

import Page from '../../layouts/Page'
import GlyphChip from '../GlyphChip'
import ClipboardCopy from '../ClipboardCopy'
import * as Strings from '../../strings'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
`

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1em;
  align-items: center;
`

const Details = styled.div`
  flex-grow: 1;
  min-width: 66%;
  caption {
    font-size: 0.8em;
    font-style: italic;
    padding-bottom: 0.5em;
    text-align: left;
    white-space: nowrap;
  }
  th, td {
    line-height: 1.1em;
    vertical-align: top;
    text-align: left;
  }
  th {
    white-space: nowrap;
    padding: 0 0.5em 0.5em 0;
  }
  td {
    padding: 0 0.5em 0.5em;
    text-indent: -0.5em;
  }
  @media all and (max-width: 30em) {
    table, tr, th, td {
      display: block;
    }
    th {
      padding-bottom: 0.1em;
    }
    td {
      padding-left: 1.5em;
    }
  }
`

export const GET_GLYPH = gql`
  query Glyph($slug: String!) {
    glyph(slug: $slug) {
      glyph
      hexCode
      combining
      ipaDefinition
      ipaNumber
      ipaName
      slug
      group
    }
  }
`

const useFetchGlyph = ( props ) => {
  const params = useParams()
  const slug = props.slug || params.slug
  const { loading, error, data } = useQuery(
    GET_GLYPH,
    {
      variables: { slug },
      skip: props.glyphObject,
    }
  )
  return {
    loading: loading || false,
    error: error || false,
    data: data || {
      glyph: props.glyphObject,
    }
  }
}

const Row = props => {
  const { heading, data } = props
  return (
    <tr>
      <th scope='row'>{ heading }:</th>
      <td>{ data }</td>
    </tr>
  )
}
Row.propTypes = {
  /** The text for the `<th>` element of the given row. */
  heading: PropTypes.string,
  /** The text for the `<td>` element of the given row. */
  data: PropTypes.string,
}

const Detail = props => {
  const { loading, error, data } = useFetchGlyph( props )
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :-/</p>

  return (
    <Wrapper data-cy='glyph-wrapper'>
      <Hero>
        <GlyphChip glyph={ data.glyph.glyph } width='10rem' style={{ margin: 0 }} />
        <ClipboardCopy
            hint={ `Copy ${data.glyph.glyph}`}
            text={ data.glyph.glyph.replace(/◌/, '') }
            button={ true }
          />
      </Hero>
      <Details>
        <table>
          <caption>{ Strings.glyphDetails }</caption>
          <tbody>
            <Row heading={ Strings.ipaNameLabel } data={ data.glyph.ipaName } />
            <Row heading={ Strings.ipaDefinitionLabel } data={ data.glyph.ipaDefinition } />
            <Row heading={ Strings.ipaNumberLabel } data={ data.glyph.ipaNumber } />
            <Row heading={ Strings.hexCodeLabel } data={ data.glyph.hexCode } />
            <Row heading={ Strings.combiningLabel } data={ data.glyph.combining ? 'true' : 'false' } />
          </tbody>
        </table>
      </Details>
    </Wrapper>
  )
}

const Glyph = props => {
  const { loading, error, data } = useFetchGlyph( props )
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :-/</p>

  return (
    <Page pageTitle={ data.glyph.ipaName.replace(/^./, s => s.toUpperCase() ) }>
      <Detail glyphObject={ data.glyph } />
    </Page>
  )
}
Glyph.Detail = Detail

Glyph.propTypes = {
  /** A glyph object */
  glyphObject: PropTypes.object,
  /** The slug for a Glyph object. You can also supply a :slug in the URL. */
  slug: PropTypes.string,
}
Detail.propTypes = Glyph.propTypes

Glyph.defaultProps = {
  glyphObject: null,
  slug: null,
}
Detail.defaultProps = Glyph.defaultProps

export default Glyph
