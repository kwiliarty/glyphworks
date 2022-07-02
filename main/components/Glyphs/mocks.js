import { GET_GLYPHS } from './Glyphs'

export const mocks = [
  {
    request: {
      query: GET_GLYPHS,
    },
    result: {
      data: {
        glyphs: [
          {
            glyph: 'p',
            slug: 'p',
          },
          {
            glyph: 't',
            slug: 't',
          },
          {
            glyph: 'k',
            slug: 'k',
          },
        ],
      },
    },
  }
] 
