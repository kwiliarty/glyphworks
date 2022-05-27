from django.test import TestCase

from glyphs.factories import GlyphFactory


class GlyphModelTests(TestCase):

    def test_glyph_fields(self):
        pass
        glyph = GlyphFactory()
        attributes = [
            'id',
            'glyph',
        ]
        for a in attributes:
            self.assertTrue(hasattr(glyph, a))

    def test___str__(self):
        glyph = GlyphFactory(
            glyph='A',
        )
        self.assertEqual(glyph.__str__(), 'A')
