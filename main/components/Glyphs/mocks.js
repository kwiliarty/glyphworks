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
            ipaName: 'lower-case p',
            ipaDefinition: 'voiceless bilabial plosive',
          },
          {
            glyph: 't',
            slug: 't',
            ipaName: 'lower-case t',
            ipaDefinition: 'voiceless alveolar plosive',
          },
          {
            glyph: 'k',
            slug: 'k',
            ipaName: 'lower-case k',
            ipaDefinition: 'voiceless velar plosive',
          },
        ],
      },
    },
  }
] 
