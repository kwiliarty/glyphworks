import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import GlyphChip from '../GlyphChip'

const Wrapper = styled.div`
  border: 1px solid ${ props => props.theme.colors.veryLightGrey };
  border-radius: 0.5rem;
  display: flex;
  background-color: ${ props => props.theme.colors.white };
`

const Info = styled.div`
  padding: 0.5rem;
  padding-left: 0;
`

const Name = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 1em;
  text-indent: -1em;
  line-height: 1em;
`

const Definition = styled.div`
  font-size: 1rem;
  margin-top: 1em;
  margin-left: 1em;
  text-indent: -1em;
  line-height: 1em;
`

const GlyphCard = props => {
  const { glyph, ipaName, ipaDefinition } = props
  return (
    <Wrapper data-cy='glyphcard-wrapper'>
      <GlyphChip glyph={ glyph } width='3rem' />
      <Info>
        <Name>{ ipaName }</Name>
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
}

GlyphCard.defaultProps = {
  glyph: '',
  ipaName: '',
  ipaDefinition: '',
}

export default GlyphCard
