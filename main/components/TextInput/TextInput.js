import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components' 

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${ props => props.theme.smallFontSize };
`

const StyledLabel = styled.label`
  margin-bottom: 0.1em;
`

const StyledInputLine = styled.div`
  display: flex;
  align-items: center;
`

const StyledInput = styled.input`
  flex-grow: 1;
  border: 1px solid ${ props => props.theme.mainTextColor };
  border-radius: ${ props => props.theme.borderRadius };
  font-family: ${ props => props.theme.ipaFontFamily };
  font-size: ${ props => props.theme.baseFontSize };
  color: ${ props => props.theme.mainTextColor };
  text-indent: 0.3em;
  &:focus {
    outline: 2px solid ${ props => props.theme.mainTextColor };
  }
`

const StyledSuffix = styled.div`
`

const TextInput = props => {

  const idStem = ( props.idStem || Math.random().toString( 36 ).substr( 2, 16 ) )
  const { children } = props

  return (
    <StyledDiv { ...props.wrapperProps }>
      <StyledLabel htmlFor={ `id-${idStem}` }>{ props.labelText }</StyledLabel>
      <StyledInputLine>
        <StyledInput
          { ...props.inputProps }
          type='text'
          id={ `id-${idStem}` }
        />
        <StyledSuffix { ...props }>
          { children && [].concat( children ).filter( child => child.type.nickname == 'Suffix' ) }
        </StyledSuffix>
      </StyledInputLine>
    </StyledDiv>
  )
}

const Suffix = props => props.children
Suffix.nickname = 'Suffix'
TextInput.Suffix = Suffix

TextInput.propTypes = {
  /** This component displays children of its subcomponents. */
  children: PropTypes.node,
  /** An optional id stem for the input fields. If none is provided, we create a random one. */
  idStem: PropTypes.string,
  /** Properties that will be passed to the `<input>` element. */
  inputProps: PropTypes.object,
  /** Label for the text input */
  labelText: PropTypes.string.isRequired,
  /** Properties that will be passed into the wrapper <div>. */
  wrapperProps: PropTypes.object,
}

TextInput.defaultProps = {
  inputProps: {},
  wrapperProps: {},
}

export default TextInput
