from django.test import TestCase


from glyphs.models import WritingSystem
from glyphs.factories import (
    AlphabetFactory,
    GlyphFactory,
    LetterFactory,
    MappingFactory,
    PhoneCategoryFactory,
    PhoneFactory,
    ReplacementFactory,
    WritingSystemFactory,
)
from main.models import ProxySuper, ProxyManager


def confirm_attributes(cls, model, attrs):
    cls.assertEqual(
        sorted([field.name for field in model._meta.fields]),
        sorted(attrs),
        msg='The model {model} fields do not match the expected list.'
    )


class WritingSystemTests(TestCase):

    attributes = [
        'proxy_name',
        'uuid',
        'slug',
        'name',
        'description',
        'parent',
        'owner',
        'created_at',
        'updated_at',
    ]

    def test_writing_system_fields(self):
        writing_system = WritingSystemFactory()
        confirm_attributes(self, writing_system, self.attributes)
        self.assertIsInstance(writing_system, ProxySuper)

    def test_writing_system__str__(self):
        writing_system = WritingSystemFactory(
            name='Test WritingSystem',
        )
        self.assertEqual(writing_system.__str__(), 'WritingSystem: Test WritingSystem')

    def test_mapping_fields(self):
        mapping = MappingFactory()
        confirm_attributes(self, mapping, self.attributes)
        self.assertIsInstance(mapping, WritingSystem)
        self.assertIsInstance(type(mapping).objects, ProxyManager)

    def test_mapping__str__(self):
        mapping = MappingFactory(
            name='Test Mapping'
        )
        self.assertEqual(
            mapping.__str__(),
            'Mapping: Test Mapping',
        )

    def test_alphabet_fields(self):
        alphabet = AlphabetFactory()
        confirm_attributes(self, alphabet, self.attributes)
        self.assertIsInstance(alphabet, WritingSystem)
        self.assertIsInstance(type(alphabet).objects, ProxyManager)

    def test_alphabet__str__(self):
        alphabet = AlphabetFactory(
            name='Test Alphabet'
        )
        self.assertEqual(
            alphabet.__str__(),
            'Alphabet: Test Alphabet',
        )


class GlyphTests(TestCase):

    attributes = [
        'glyph',
        'owner',
        'created_at',
        'updated_at',
    ]

    def test_glyph_fields(self):
        glyph = GlyphFactory()
        confirm_attributes(self, glyph, self.attributes)

    def test_glyph_properties(self):
        Z = GlyphFactory(glyph='Z')
        self.assertEqual('0x5a', Z.hex)
        self.assertEqual('LATIN CAPITAL LETTER Z', Z.name)
        self.assertEqual('Z', Z.in_isolation)

        bridge = GlyphFactory(glyph='\u032a')
        self.assertEqual('0x32a', bridge.hex)
        self.assertEqual('COMBINING BRIDGE BELOW', bridge.name)
        self.assertEqual('◌̪', bridge.in_isolation)

    def test_glyph__str__(self):
        glyph = GlyphFactory(
            glyph='Z'
        )
        self.assertEqual(
            glyph.__str__(),
            'Z (0x5a) LATIN CAPITAL LETTER Z'
        )


class PhoneCategoryTests(TestCase):

    attributes = [
        'slug',
        'name',
        'description',
        'owner',
        'created_at',
        'updated_at',
    ]

    def test_phone_category_fields(self):
        phone_category = PhoneCategoryFactory()
        confirm_attributes(self, phone_category, self.attributes)

    def test_phone_category__str__(self):
        phone_category = PhoneCategoryFactory(
            slug='t',
            name='Test'
        )
        self.assertEqual(
            phone_category.__str__(),
            'PhoneCategory t: Test'
        )


class PhoneTests(TestCase):

    attributes = [
        'definition',
        'category',
        'owner',
        'created_at',
        'updated_at',
    ]

    def test_phone_fields(self):
        phone = PhoneFactory()
        confirm_attributes(self, phone, self.attributes)

    def test_phone__str__(self):
        phone = PhoneFactory(definition='chortle')
        self.assertEqual(
            phone.__str__(),
            'Phone: chortle'
        )


class LetterTests(TestCase):

    attributes = [
        'uuid',
        'alphabet',
        'glyph',
        'phone',
        'name',
        'identifier',
        'letter_type',
        'owner',
        'created_at',
        'updated_at',
    ]

    def test_letter_fields(self):
        letter = LetterFactory()
        confirm_attributes(self, letter, self.attributes)

    def test_letter__str__(self):
        alphabet = AlphabetFactory(name='Test Alphabet')
        glyph = GlyphFactory(glyph='Z')
        phone = PhoneFactory(definition='snoring')

        letter = LetterFactory(
            alphabet=alphabet,
            glyph=glyph,
            phone=phone
        )
        self.assertEqual(
            letter.__str__(),
            'Test Alphabet Z, snoring'
        )


class ReplacementTests(TestCase):

    attributes = [
        'uuid',
        'mapping',
        'text',
        'letter',
        'owner',
        'created_at',
        'updated_at',
    ]

    def test_replacement_fields(self):
        replacement = ReplacementFactory()
        confirm_attributes(self, replacement, self.attributes)

    def test_replacement__str__(self):
        alphabet = AlphabetFactory(
            name='Test Alphabet',
            slug='test-alphabet'
        )
        glyph = GlyphFactory(glyph='Z')
        phone = PhoneFactory(definition='snoring')
        letter = LetterFactory(
            alphabet=alphabet,
            glyph=glyph,
            phone=phone
        )
        mapping = MappingFactory(
            name='Test Mapping',
            slug='test-mapping'
        )
        replacement = ReplacementFactory(
            mapping=mapping,
            letter=letter,
            text='z',
        )
        self.assertEqual(
            replacement.__str__(),
            'Test Mapping z for Test Alphabet Z'
        )
