import React from 'react'
import styled from 'styled-components' 

import { xsampa2ipa, ipa2xsampa } from '../../js-utils/mapping'
import TextInput from '../TextInput'

const StyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
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
      margin: '0.5em',
    },
  }

  return (
    <StyledDiv>
      <TextInput
        labelText='X-SAMPA'
        inputProps={{
          value: value.ascii,
          onChange: updateXsampa,
        }}
        wrapperProps={ wrapperProps }
      />
      <TextInput
        labelText='IPA'
        inputProps={{
          value: value.ipa,
          onChange: updateIpa,
        }}
        wrapperProps={ wrapperProps }
      />
    </StyledDiv>
  )
}

export default IpaPairedInput
