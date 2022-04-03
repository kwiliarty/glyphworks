/**
 * @jest-environment node
 */

import { xsampa2ipa, ipa2xsampa, xsampaIpaMap, ipaXsampaMap } from './mapping'

const testPairs = [
  [ 'S', 'ʃ' ],
  [ 'G\\_< sI O\\_h_+', 'ʛ sɪ ʘʰ̟' ],
  [ 't_h{p_f', 'tʰæp͡f' ],
  [ '@` @-`', 'ɚ ə​˞' ],
]

describe( 'The ipa mapping util', () => {
  it( 'converts X-SAMPA to IPA', () => {
    testPairs.forEach( pair => {
      expect( xsampa2ipa( pair[0] ) ).toBe( pair[1] )
    })
  })

  it( 'converts IPA to X-SAMPA', () => {
    testPairs.forEach( pair => {
      expect( ipa2xsampa( pair[0] ) ).toBe( pair[0] )
    })
  })

  it( 'is largely reversible', () => {
    // In some cases there are 2 X-Sampa alternative for a single glyph.
    // In those cases we return the shorter alternative when going from IPA to X-SAMPA.
    // This is why we exclude certain X-SAMPA keys from reversibility.
    const stoplist = [ 'v\\', '_j', '_/', '_=', '_\\', '_~' ]
    Object.keys( xsampaIpaMap ).forEach( key => {
      if ( !stoplist.includes( key ) ) {
        expect( key ).toBe( ipa2xsampa( xsampa2ipa( key ) ) )
      }
    })
  })

  it( 'exports an xsampaIpaMap', () => {
    // This map contains six pairs of alternative keys that produce the same IPA glyph.
    expect( Object.keys( xsampaIpaMap ) ).toHaveLength( 173 )
  })

  it( 'exports an ipaXsampaMap', () => {
    expect( Object.keys( ipaXsampaMap ) ).toHaveLength( 167 )
  })
})
