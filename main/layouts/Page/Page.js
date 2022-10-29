import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  h1 {
    margin-bottom: 1em;
  }
`

const Page = props => {
  const { pageTitle, children } = props
  const h1 = props.h1 || pageTitle

  useEffect(() => {
    const wrapper = document.getElementById('app')
    if ( wrapper ) {
      wrapper.focus()
    }
  }, [])

  useEffect(() => {
    document.title = `${ pageTitle } : GlyphWorks`
  }, [ pageTitle ])

  return (
    <Container>
      <h1>{ h1 }</h1>
      { children }
    </Container>
  )
}

Page.propTypes = {
  /** This component will display children */
  children: PropTypes.node,
  /** A title for the page */
  pageTitle: PropTypes.string,
  /** The h1 for the page */
  h1: PropTypes.string,
}

Page.defaultProps = {
}

/** @component */
export default Page
