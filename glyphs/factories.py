import factory

from glyphs.models import Glyph, Map


class GlyphFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Glyph

    glyph = 'Z'
    slug = 'z'


class MapFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Map

    slug = 'test'
    name = 'Test Map'
