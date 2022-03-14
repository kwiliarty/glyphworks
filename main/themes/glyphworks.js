export const fonts = {
  gentium: 'GentiumPlus, serif',
}

export const colors = {
  white: '#ffffff',
  black: '#202020',
  veryLightGreen: '#badfba',
  lightGreen: '#60a060',
  green: '#326e32',
  darkGreen: '#134e13',
  veryDarkGreen: '#002000',
  veryLightPurple: '#b6b0ce',
  lightPurple: '#635a8a',
  purple: '#3a315f',
  darkPurple: '#1f1643',
  veryDarkPurple: '#08031b',
  veryLightBrown: '#fff7d4',
  lightBrown: '#c9b978',
  brown: '#897b3f',
  darkBrown: '#625418',
  veryDarkBrown: '#282000',
  veryLightRed: '#ffd4d4',
  lightRed: '#c97878',
  red: '#893f3f',
  darkRed: '#621818',
  veryDarkRed: '#280000',
}

const theme = {
  fonts: { ...fonts },
  colors: { ...colors },
  basePadding: '1rem',
  bodyFontFamily: fonts.gentium,
  ipaFontFamily: fonts.gentium,
  baseFontSize: '28px',
  smallFontSize: '20px',
  headerBgColor: colors.darkBrown,
  headerTextColor: colors.veryLightBrown,
  footerBgColor: colors.veryDarkBrown,
  footerTextColor: colors.white,
}

export default theme
