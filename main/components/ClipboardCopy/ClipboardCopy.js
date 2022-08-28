import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import styled from 'styled-components'

import { copyTextToClipboard } from './utils.js'

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  color: inherit;
`

const StyledContentCopyRoundedIcon = styled( ContentCopyRoundedIcon )`
  color: inherit;
`

const StyledCheckRoundedIcon = styled( CheckRoundedIcon )`
  color: ${ props => props.theme.colors.darkGreen };
`

const ClipboardCopy = props => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopyClick = () => {
    copyTextToClipboard( props.text )
      .then( () => {
        setIsCopied( true )
        setTimeout(() => {
          setIsCopied( false )
        }, 1500)
      })
      .catch( ( err ) => {
        console.log( err )
      })
  }

  return (
    <StyledButton onClick={ handleCopyClick } aria-label={ props.ariaLabel }>
      {
        isCopied
        ?
          <StyledCheckRoundedIcon />
        :
          <StyledContentCopyRoundedIcon />
      }
    </StyledButton>
  )
}

ClipboardCopy.propTypes = {
  /** Label text for accessibility */
  ariaLabel: PropTypes.string,
  /** The contents to be copied to the clipboard */
  text: PropTypes.string,
}

ClipboardCopy.defaultProps = {
  ariaLabel: 'Copy',
  text: '',
}

export default ClipboardCopy
