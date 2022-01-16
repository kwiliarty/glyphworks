import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  /* use Doulos SIL - Regular in .woff2 format */
  @font-face {
    font-family: DoulosSILW;
    src: url(static/fonts/DoulosSIL-Regular.woff2);
  }

  body {
    font-family: ${ props => props.theme.fontFamily };
    font-family: 'DoulosSILW', sans-serif;
  }
`

export default GlobalStyle
