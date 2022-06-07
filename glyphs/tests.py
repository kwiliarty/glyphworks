from django.test import TestCase

from glyphs.factories import GlyphFactory


class GlyphModelTests(TestCase):

    def test_glyph_fields(self):
        pass
        glyph = GlyphFactory()
        attributes = [
            'glyph',
            'hex_code',
            'combining',
            'ipa_definition',
            'ipa_number',
            'ipa_name',
            'slug',
            'group',
        ]
        for a in attributes:
            self.assertTrue(
                hasattr(glyph, a),
                msg=f'The glyph {glyph} does not have the attribute {a}',
            )

    def test___str__(self):
        glyph = GlyphFactory(
            glyph='A',
            slug='capital-a',
            ipa_name='Capital A',
            ipa_definition='voiced mono-syllable',
        )
        self.assertEqual(glyph.__str__(), 'A (Capital A): voiced mono-syllable')
