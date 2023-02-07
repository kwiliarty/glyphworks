from django.test import TestCase

from glyphs.models import Glyph, Mapping, Replacement
from glyphs.factories import GlyphFactory, MappingFactory, ReplacementFactory


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
        self.assertGreater(Glyph.objects.count(), 100)

    def test_mapping_fields(self):
        mapping = MappingFactory()
        attributes = [
            'slug',
            'name',
            'description',
        ]
        self.confirm_attributes(mapping, attributes)

    def test_mapping__str__(self):
        mapping = MappingFactory()
        self.assertEqual(mapping.__str__(), "Test Mapping")

    def test_mapping_load(self):
        self.assertGreater(Mapping.objects.count(), 0)

    def test_replacement_fields(self):
        replacement = ReplacementFactory()
        attributes = [
            'text',
            'mapping_slug',
            'glyph_slug',
        ]
        self.confirm_attributes(replacement, attributes)

    def test_replacement_string(self):
        replacement = ReplacementFactory()
        self.assertEqual(replacement.__str__(), 'Test Mapping from Z to Z (upper-case-z): snoring')

    def test_replacement_load(self):
        self.assertGreater(Replacement.objects.count(), 100)
