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
            slug: 'lower-case-p',
            ipaName: 'lower-case p',
            ipaDefinition: 'voiceless bilabial plosive',
          },
          {
            glyph: 't',
            slug: 'lower-case-t',
            ipaName: 'lower-case t',
            ipaDefinition: 'voiceless alveolar plosive',
          },
          {
            glyph: 'k',
            slug: 'lower-case-k',
            ipaName: 'lower-case k',
            ipaDefinition: 'voiceless velar plosive',
          },
        ],
      },
    },
  }
] 
