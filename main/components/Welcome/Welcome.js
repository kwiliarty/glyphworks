import React from 'react'

import Page from '../../layouts/Page'
import IpaPairedInput from '../IpaPairedInput'
import * as Strings from '../../strings'

const Welcome = () => {
  return (
    <Page
      pageTitle={ Strings.home }
      h1={ Strings.welcomeH1 }
    >
      { Strings.welcomeMessage }
      <IpaPairedInput />
      { Strings.quickstartExamples }
    </Page>
  )
}

export default Welcome
