import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  /* Doulos SIL - Regular */
  @font-face {
    font-family: DoulosSIL;
    src: url(static/fonts/DoulosSIL-Regular.woff2) format('woff2'),
         url(static/fonts/DoulosSIL-Regular.woff) format('woff');
    font-display: block;
  }

  /* GentiumPlus */
  /* Regular */
  @font-face {
    font-family: GentiumPlus;
    src: url(static/fonts/GentiumPlus-Regular.woff2) format('woff2'),
         url(static/fonts/GentiumPlus-Regular.woff) format('woff');
    font-display: block;
  }
  @font-face {
    font-family: GentiumPlus;
    src: url(static/fonts/GentiumPlus-Italic.woff2) format('woff2'),
         url(static/fonts/GentiumPlus-Italic.woff) format('woff');
    font-display: block;
    font-style: italic;
  }
  @font-face {
    font-family: GentiumPlus;
    src: url(static/fonts/GentiumPlus-Bold.woff2) format('woff2'),
         url(static/fonts/GentiumPlus-Bold.woff) format('woff');
    font-display: block;
    font-weight: bold;
  }
  @font-face {
    font-family: GentiumPlus;
    src: url(static/fonts/GentiumPlus-BoldItalic.woff2) format('woff2'),
         url(static/fonts/GentiumPlus-BoldItalic.woff) format('woff');
    font-display: block;
    font-style: italic;
    font-weight: bold;
  }

  body {
    font-family: ${ props => props.theme.fontFamily };
    font-family: 'GentiumPlus', sans-serif;
  }

  h1 {
    font-size: 2em;
    margin: 0.5em 0;
  }
`

export default GlobalStyle
