import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import styled from 'styled-components'

import { copyTextToClipboard } from './utils.js'

const StyledButton = styled.button`
  position:relative;
  background-color: ${ props => props.theme.colors[props.bColor] };
  color: ${ props => props.theme.colors[props.color] };
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.2rem;
  border: none;
  border-radius: calc(${ props => props.theme.borderRadius } * 4);
  width: 100%;
  margin: 1rem 0;
  font-size: 1.3rem;
  font-family: ${ props => props.theme.hintFontFamily };
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
  position: absolute;
  left: 10px;
`

const StyledContentCopyRoundedIcon = styled( ContentCopyRoundedIcon )`
  color: inherit;
  ${ StyledIconPosition }
`

const StyledCheckRoundedIcon = styled( CheckRoundedIcon )`
  color: ${ props => props.theme.colors.lightGreen };
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
  bColor: PropTypes.string,
  /** A foreground color name */
  color: PropTypes.string,
  
}

ClipboardCopy.defaultProps = {
  hint: 'Copy',
  text: '',
  button: false,
  bColor: 'darkRed',
  color: 'veryLightBrown',
}

export default ClipboardCopy
