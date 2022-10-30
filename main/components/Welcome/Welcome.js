import React, { useEffect } from 'react'
import styled from 'styled-components'

import IpaPairedInput from '../IpaPairedInput'
import * as Strings from '../../strings'

const Wrapper = styled.div`
`

const Welcome = () => {
  useEffect(() => {
    const wrapper = document.getElementById('app')
    if ( wrapper ) {
      wrapper.focus()
    }
  }, [])

  return (
    <Wrapper>
      { Strings.welcome_message }
      <IpaPairedInput />
      { Strings.quickstart_examples }
    </Wrapper>
  )
}

export default Welcome
