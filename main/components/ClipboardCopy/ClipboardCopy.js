import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import styled from 'styled-components'

import { copyTextToClipboard } from './utils.js'

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: inherit;
  position: relative;
  .button-hint {
    opacity: 0;
    height: 0;
    width: 0;
    padding: 0;
  }
  :focus-visible, :hover {
    .button-hint {
      opacity: 1;
      height: auto;
      width: auto;
      padding: 0.5em 1em;
    }
  }
`

const StyledTip = styled.span`
  position: absolute;
  bottom: 100%;
  right: 0;
  background-color: ${ props => props.theme.colors.darkRed };
  color: ${ props => props.theme.headerTextColor };
  font-family: ${ props => props.theme.hintFontFamily };
  padding: 4px;
  margin-bottom: 4px;
  border-radius: 0.5em;
  transition: opacity 0.2s ease;
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
    <StyledButton onClick={ handleCopyClick }>
      <StyledTip className='button-hint'>{ props.hint }</StyledTip>
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
  /** Hint text */
  hint: PropTypes.string,
  /** The contents to be copied to the clipboard */
  text: PropTypes.string,
}

ClipboardCopy.defaultProps = {
  hint: 'Copy',
  text: '',
}

export default ClipboardCopy
