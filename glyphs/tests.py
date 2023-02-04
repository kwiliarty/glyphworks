from django.test import TestCase

from glyphs.models import Glyph, Map
from glyphs.factories import GlyphFactory, MapFactory


class GlyphModelTests(TestCase):

    def confirm_attributes(self, model, attrs):
        for a in attrs:
            self.assertTrue(
                hasattr(model, a),
                msg=f'The model {model} does not have the attribute {a}.'
            )

    def test_glyph_fields(self):
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
        self.confirm_attributes(glyph, attributes)

    def test_glyph__str__(self):
        glyph = GlyphFactory(
            glyph='A',
            slug='capital-a',
            ipa_name='Capital A',
            ipa_definition='voiced mono-syllable',
        )
        self.assertEqual(glyph.__str__(), 'A (capital-a): voiced mono-syllable')

    def test_glyph_load(self):
        self.assertEqual(Glyph.objects.count(), 189)

    def test_map_fields(self):
        mapp = MapFactory()
        attributes = [
            'slug',
            'name',
            'description',
        ]
        self.confirm_attributes(mapp, attributes)

    def test_map__str__(self):
        mapp = MapFactory(
            slug='test',
            name='Test',
            description='This is just for testing.',
        )
        self.assertEqual(mapp.__str__(), "Test Map")

    def test_map_load(self):
        self.assertEqual(Map.objects.count(), 1)
