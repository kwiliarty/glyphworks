import factory

from glyphs.models import Glyph


class GlyphFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Glyph

    glyph = 'Z'
    slug = 'z'
