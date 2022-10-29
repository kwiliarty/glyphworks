import { GET_GLYPH } from './Glyph'

export const mocks = [
  {
    request: {
      query: GET_GLYPH,
      variables: {
        slug: 'lower-case-p',
      },
    },
    result: {
      'data': {
        'glyph': {
          'glyph': 'p',
          'hexCode': '0070',
          'combining': false,
          'ipaDefinition': 'voiceless bilabial plosive',
          'ipaNumber': '101',
          'ipaName': 'lower-case p',
          'slug': 'lower-case-p',
          'group': 'PC'
        }
      }
    },
  }
] 
