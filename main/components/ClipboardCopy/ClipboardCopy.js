import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import styled from 'styled-components'

import { copyTextToClipboard } from './utils.js'

const StyledButton = styled.button`
  position:relative;
  background-color: transparent;
  background-clip: padding-box;
  color: ${ props => props.theme.colors.darkRed };
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 0.5rem;
  height: 2.2rem;
  border: 0.1em solid ${ props => props.theme.colors.darkRed };
  border-radius: ${ props => props.theme.borderRadius };
  font-size: 1.3rem;
  font-family: ${ props => props.theme.bodyFontFamily };
  padding: 1px 0.5em;
  :focus-visible {
    outline: ${ props => props.theme.focusOutline };
    border: none;
  }
  :hover {
    color: ${ props => props.theme.colors.parchment };
    background-color: ${ props => props.theme.colors.darkRed };
  }
`

const StyledIcon = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: inherit;
  height: 1.5rem;
  width: 1.5rem;
  padding: 0;
  position: relative;
  .button-hint {
    opacity: 0;
    height: 0;
    width: 0;
    padding: 0;
    overflow: hidden;
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
`

const StyledIconPosition = `
`

const StyledContentCopyRoundedIcon = styled( ContentCopyRoundedIcon )`
  color: inherit;
  ${ StyledIconPosition }
`

const StyledCheckRoundedIcon = styled( CheckRoundedIcon )`
  color: inherit;
  ${ StyledIconPosition }
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

  const WrapperEl = props.button ? StyledButton : StyledIcon

  console.log(props.theme)
  return (
    <WrapperEl {...props} onClick={ handleCopyClick }>
      { !props.button && <StyledTip className='button-hint'>{ props.hint }</StyledTip> }
      {
        isCopied
        ?
          <StyledCheckRoundedIcon />
        :
          <StyledContentCopyRoundedIcon />
      }
      { props.button && <span>{ props.hint }</span> }
    </WrapperEl>
  )
}

ClipboardCopy.propTypes = {
  /** Hint text */
  hint: PropTypes.string,
  /** The contents to be copied to the clipboard */
  text: PropTypes.string,
  /** Button or icon */
  button: PropTypes.bool,
  /** A background color name */
  color: PropTypes.string,
}

ClipboardCopy.defaultProps = {
  hint: 'Copy',
  text: '',
  button: false,
  color: 'veryLightBrown',
}

export default ClipboardCopy
