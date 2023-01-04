import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import GlyphChip from '../GlyphChip'
import ClipboardCopy from '../ClipboardCopy'
import Link from '../Link'

const Wrapper = styled.div`
  border: 1px solid ${ props => props.theme.colors.veryLightGrey };
  border-radius: 0.5rem;
  display: flex;
  background-color: ${ props => props.theme.colors.white };
  position: relative;
  :hover, :focus-within {
    box-shadow: 0 0 0 2px ${ props => props.theme.colors.darkRed };
    a:focus {
      outline: none;
    }
  }
`

const Info = styled.div`
  flex-grow: 1;
  padding: 0.5rem;
  padding-left: 0;
`

const Name = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  column-gap: 0.5em;
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1em;
  a {
    margin-left: 0.5em;
    text-indent: -0.5em;
    text-decoration: none;
    :hover {
      outline: none;
    }
    ::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  }
  button {
    white-space: nowrap;
  }
`

const Definition = styled.div`
  font-size: 1rem;
  margin-top: 1em;
  margin-left: 1em;
  text-indent: -1em;
  line-height: 1em;
`

const GlyphCard = props => {
  const { glyph, ipaName, ipaDefinition, slug } = props
  return (
    <Wrapper data-cy='glyphcard-wrapper'>
      <GlyphChip glyph={ glyph } width='3rem' />
      <Info>
        <Name>
          <Link href={ `glyphs/${ slug }` } color='darkRed'>
            { ipaName }
          </Link>
          <ClipboardCopy
            hint={ `Copy ${glyph}`}
            text={ glyph.replace(/◌/, '') }
          />
        </Name>
        <Definition>{ ipaDefinition }</Definition>
      </Info>
    </Wrapper>
  )
}

GlyphCard.propTypes = {
  /** A glyph */
  glyph: PropTypes.string,
  /** The IPA definition of the glyph */
  ipaDefinition: PropTypes.string,
  /** The IPA name of the glyph */
  ipaName: PropTypes.string,
  /** The slug for the link to the glyph detail page */
  slug: PropTypes.string,
}

GlyphCard.defaultProps = {
  glyph: '',
  ipaName: '',
  ipaDefinition: '',
  slug: '',
}

export default GlyphCard
