import unicodedata as uc

from django.db import models

from main.models import (
    AuditMixin,
    BaseModel,
    NamedForeignKey,
    OwnerMixin,
    ProxySuper,
    ProxyManager,
    UuidMixin,
)


class GlyphQuerySet(models.QuerySet):
    '''Custom functions for Glyph.objects'''

    pass


class Glyph(OwnerMixin, AuditMixin, BaseModel):
    '''The principal glyph model.'''

    objects = GlyphQuerySet.as_manager()

    glyph = models.CharField(
        max_length=5,
        primary_key=True,
    )

    @property
    def hex(self):
        return hex(ord(self.glyph))

    @property
    def name(self):
        return uc.name(self.glyph)

    @property
    def in_isolation(self): return self.glyph if uc.combining(self.glyph) == 0 else f'\u25cc{self.glyph}'

    def __str__(self):
        '''Custom display string'''
        return f'{self.glyph} ({self.hex}) {self.name}'


# class LetterQuerySet(models.QuerySet):
#     '''Custom functions for Letter.objects'''

#     def get_by_natural_key(self, alphabet, glyph):
#         return self.get(
#             alphabet=alphabet,
#             glyph=glyph,
#         )


class Letter(UuidMixin, OwnerMixin, AuditMixin, BaseModel):
    '''A Letter assigns a Glyph to an Alphabet and a Phone'''

#     # class Meta:
#     #     constraints = [
#     #         models.UniqueConstraint(
#     #             'alphabet',
#     #             'glyph',
#     #             name='unique_letter_alphabet_glyph',
#     #         )
#     #     ]

    class Type(models.TextChoices):
        '''Enumeration for the possible letter types'''
        NORMAL = 'normal', 'Normal'
        MODIFIER = 'modifier', 'Modifier'
        CHAO = 'chao', 'Chao letter'

#     # def natural_key(self):
#     #     return (self.alphabet, self.glyph)

#     # objects = LetterQuerySet.as_manager()

    # A Letter belongs to an Alphabet
    alphabet = NamedForeignKey(
        'WritingSystem',
        on_delete=models.CASCADE,
        db_column='alphabet',
        id_suffix='uuid',
        related_name='letters',
        null=True,
    )
    # A letter belongs to a Glyph
    glyph = NamedForeignKey(
        'Glyph',
        on_delete=models.CASCADE,
        db_column='glyph',
        id_suffix='glyph',
        related_name='letters',
        null=True,
    )
    # A letter belongs to a Phone
    phone = NamedForeignKey(
        'Phone',
        on_delete=models.CASCADE,
        db_column='phone',
        id_suffix='definition',
        related_name='letters',
        null=True,
    )
    # A Letter has a name in an Alphabet
    name = models.CharField(
        max_length=200,
        null=True,
        blank=False,
    )
    # A Letter may have an Alphabet-specific identifier
    identifier = models.CharField(
        max_length=200,
        null=True,
        blank=False,
    )
    # Letters come in a range of types
    letter_type = models.CharField(
        max_length=100,
        choices=Type.choices,
        default=Type.NORMAL,
    )

    def __str__(self):
        '''Custom display string'''
        return f'{self.alphabet.name} {self.glyph.in_isolation}, {self.phone.definition}'


class Phone(OwnerMixin, AuditMixin, BaseModel):
    '''A speech sound'''

    definition = models.CharField(
        primary_key=True,
        max_length=200,
    )
    category = NamedForeignKey(
        'PhoneCategory',
        on_delete=models.SET_NULL,
        db_column='category_slug',
        id_suffix='slug',
        related_name='phones',
        null=True,
        blank=True,
    )

    def __str__(self):
        return f'Phone: {self.definition}'


class WritingSystem(UuidMixin, OwnerMixin, AuditMixin, ProxySuper):
    '''A collection of Replacements for Letters of an Alphabet'''

    slug = models.CharField(
        max_length=100,
        unique=True,
    )
    name = models.CharField(max_length=100)
    description = models.TextField(
        blank=True,
    )
    parent = NamedForeignKey(
        'WritingSystem',
        on_delete=models.CASCADE,
        db_column='parent_uuid',
        id_suffix='uuid',
        related_name='children',
        null=True,
        blank=True,
    )

    def __str__(self):
        '''Custom display string'''
        return f'{self.proxy_name}: {self.name}'


class Mapping(WritingSystem):
    '''Mappings associate Replacements with Glyphs.'''

    class Meta:
        proxy = True

    objects = ProxyManager()


class Alphabet(WritingSystem):
    '''Alphabets associate Glyphs with Phones.'''

    class Meta:
        proxy = True

    objects = ProxyManager()


# class ReplacementQuerySet(models.QuerySet):
#     '''Custom functions for Replacement.objects'''

#     def longest_first(self):
#         return self.order_by(models.functions.Length('text').desc())

#     def get_by_natural_key(self, text, mapping):
#         return self.get(
#             text=text,
#             mapping=mapping,
#         )


class Replacement(UuidMixin, OwnerMixin, AuditMixin, BaseModel):
    '''A specific text replacement for an IPA Glyph within a given Mapping'''

#     class Meta:
#         constraints = [
#             models.UniqueConstraint(
#                 'text',
#                 'mapping',
#                 name='unique_text_glyph_mapping',
#             )
#         ]

#     def natural_key(self):
#         return (self.text, self.mapping)

#     objects = ReplacementQuerySet.as_manager()

    text = models.CharField(
        max_length=20,
        null=True,
        blank=False,
    )
    letter = NamedForeignKey(
        'Letter',
        on_delete=models.CASCADE,
        db_column='letter',
        id_suffix='uuid',
        related_name='replacements',
        null=True,
    )
    mapping = NamedForeignKey(
        'WritingSystem',
        on_delete=models.CASCADE,
        db_column='mapping',
        id_suffix='uuid',
        related_name='replacements',
        null=True,
    )

    def __str__(self):
        return f'{self.mapping.name} {self.text} for {self.letter.alphabet.name} {self.letter.glyph.in_isolation}'


class PhoneCategory(OwnerMixin, AuditMixin, BaseModel):
    '''The possible categories that a Phone can belong to'''

    slug = models.CharField(
        primary_key=True,
        max_length=200,
    )
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    def __str__(self):
        '''Custom display string'''
        return f'PhoneCategory {self.slug}: {self.name}'
