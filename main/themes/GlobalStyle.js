import { createGlobalStyle } from 'styled-components'
import { fonts } from './glyphworks'

const GlobalStyle = createGlobalStyle`
  /* Doulos SIL - Regular */
  @font-face {
    font-family: DoulosSIL;
    src: url(static/fonts/DoulosSIL-Regular.woff2) format('woff2'),
         url(static/fonts/DoulosSIL-Regular.woff) format('woff');
  }

  /* GentiumPlus */
  /* Regular */
  @font-face {
    font-family: GentiumPlus;
    src: url(static/fonts/GentiumPlus-Regular.woff2) format('woff2'),
         url(static/fonts/GentiumPlus-Regular.woff) format('woff');
  }
  @font-face {
    font-family: GentiumPlus;
    src: url(static/fonts/GentiumPlus-Italic.woff2) format('woff2'),
         url(static/fonts/GentiumPlus-Italic.woff) format('woff');
    font-style: italic;
  }
  @font-face {
    font-family: GentiumPlus;
    src: url(static/fonts/GentiumPlus-Bold.woff2) format('woff2'),
         url(static/fonts/GentiumPlus-Bold.woff) format('woff');
    font-weight: bold;
  }
  @font-face {
    font-family: GentiumPlus;
    src: url(static/fonts/GentiumPlus-BoldItalic.woff2) format('woff2'),
         url(static/fonts/GentiumPlus-BoldItalic.woff) format('woff');
    font-style: italic;
    font-weight: bold;
  }

  /* Andika */
  /* Regular */
  @font-face {
    font-family: Andika;
    src: url(static/fonts/Andika-Regular.woff2) format('woff2'),
         url(static/fonts/Andika-Regular.woff) format('woff');
  }
  @font-face {
    font-family: Andika;
    src: url(static/fonts/Andika-Italic.woff2) format('woff2'),
         url(static/fonts/Andika-Italic.woff) format('woff');
    font-style: italic;
  }
  @font-face {
    font-family: Andika;
    src: url(static/fonts/Andika-Bold.woff2) format('woff2'),
         url(static/fonts/Andika-Bold.woff) format('woff');
    font-weight: bold;
  }
  @font-face {
    font-family: Andika;
    src: url(static/fonts/Andika-BoldItalic.woff2) format('woff2'),
         url(static/fonts/Andika-BoldItalic.woff) format('woff');
    font-style: italic;
    font-weight: bold;
  }

  body {
    font-family: ${ props => props.theme.bodyFontFamily };
    font-size: ${ props => props.theme.baseFontSize };
    margin: 0;
    padding: 0;
  }

  h1 {
    color: ${ props => props.theme.colors.darkRed };
    font-size: 2.5rem;
    font-weight: normal;
    margin: 0.5em 0;
  }

  // creates classes for each font
  ${ Object.keys(fonts).map( font => 
    `.${font} { font-family: ${ fonts[font] };}`
  )}

  :focus-visible {
    outline: ${ props => props.theme.focusOutline };
  }
`

export default GlobalStyle
