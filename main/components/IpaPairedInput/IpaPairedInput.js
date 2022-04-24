import React from 'react'
import styled from 'styled-components' 

import { xsampa2ipa, ipa2xsampa } from '../../js-utils/mapping'
import TextInput from '../TextInput'

const StyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
`

const IpaPairedInput = () => {

  const [ value, setValue ] = React.useState({
    ascii: '',
    ipa: '',
  })

  const updateXsampa = event => {
    setValue({
      ascii: event.target.value,
      ipa: xsampa2ipa(event.target.value),
    })
  }

  const updateIpa = event => {
    setValue({
      ascii: ipa2xsampa(event.target.value),
      ipa: event.target.value,
    })
  }

  const wrapperProps = {
    style: {
      margin: '0',
    },
  }

  const xsampaId = ( Math.random().toString( 36 ).substr( 2, 16 ) )
  const ipaId = ( Math.random().toString( 36 ).substr( 2, 16 ) )

  return (
    <StyledDiv>
      <TextInput
        labelText='X-SAMPA'
        idStem={ xsampaId }
        inputProps={{
          name: 'xsampa',
          value: value.ascii,
          onChange: updateXsampa,
          'aria-controls': `id-${ ipaId }`,
          style: {
            marginBottom: '0.5em',
          },
        }}
        wrapperProps={ wrapperProps }
      />
      <TextInput
        labelText='IPA'
        idStem={ ipaId }
        inputProps={{
          name: 'ipa',
          value: value.ipa,
          onChange: updateIpa,
          'aria-controls': `id-${ xsampaId }`
        }}
        wrapperProps={ wrapperProps }
      />
    </StyledDiv>
  )
}

export default IpaPairedInput
