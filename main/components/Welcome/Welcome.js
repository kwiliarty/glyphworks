import React from 'react'

import Page from '../../layouts/Page'
import IpaPairedInput from '../IpaPairedInput'
import * as Strings from '../../strings'

const Welcome = () => {
  return (
    <Page
      pageTitle={ Strings.home }
      h1={ Strings.welcome_h1 }
    >
      { Strings.welcome_message }
      <IpaPairedInput />
      { Strings.quickstart_examples }
    </Page>
  )
}

export default Welcome
