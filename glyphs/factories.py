import factory

from glyphs.models import (
    Alphabet,
    Glyph,
    Letter,
    Mapping,
    Phone,
    PhoneCategory,
    Replacement,
    WritingSystem,
)


class GlyphFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Glyph


class ReplacementFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Replacement

#     text = 'Z'
    # mapping = factory.SubFactory(MappingFactory)
    # glyph = factory.SubFactory(GlyphFactory)


class WritingSystemFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = WritingSystem


class LetterFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Letter


class MappingFactory(WritingSystemFactory):
    class Meta:
        model = Mapping


class AlphabetFactory(WritingSystemFactory):
    class Meta:
        model = Alphabet


class PhoneCategoryFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = PhoneCategory


class PhoneFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Phone
