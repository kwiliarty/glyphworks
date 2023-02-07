import factory

from glyphs.models import Glyph, Mapping, Replacement


class GlyphFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Glyph

    glyph = 'Z'
    slug = 'upper-case-z'
    ipa_definition = 'snoring'


class MappingFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Mapping

    slug = 'test'
    name = 'Test'


class ReplacementFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Replacement

    text = 'Z'
    mapping = factory.SubFactory(MappingFactory)
    glyph = factory.SubFactory(GlyphFactory)
