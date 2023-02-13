from django.db import models
from main.models import NamedForeignKey


class GlyphQuerySet(models.QuerySet):
    '''Custom functions for Glyph.objects'''

    def on_chart(self):
        return self.exclude(group=Glyph.Group.NOT_ON_CHART)


class Glyph(models.Model):
    '''The principal glyph model.'''

    class Meta:
        ordering = ['ipa_number']

    objects = GlyphQuerySet.as_manager()

    class Group(models.TextChoices):
        '''Enumeration for the possible glyph groups'''
        PULMONIC_CONSONANT = 'PC', 'pulmonic consonant'
        NON_PULMONITC_CONSONANT = 'NPC', 'non-pulmonic consonant'
        OTHER_SYMBOL = 'OS', 'other symbol'
        VOWEL = 'V', 'vowel'
        DIACRITIC = 'D', 'diacritic'
        SUPRASEGMENTAL = 'SS', 'suprasegmental'
        TONE = 'T', 'tone or word accent'
        NOT_ON_CHART = 'NOC', 'not on chart'

    glyph = models.CharField(
        max_length=5,
        unique=True,
        default='',
    )
    hex_code = models.CharField(
        max_length=4,
        unique=True,
        default='',
    )
    combining = models.BooleanField(
        default=False,
    )
    ipa_definition = models.CharField(
        max_length=100,
        default='',
        blank=True,
    )
    ipa_number = models.CharField(
        max_length=5,
        default='',
        blank=True,
    )
    ipa_name = models.CharField(
        max_length=100,
        default='',
        blank=True,
    )
    slug = models.CharField(
        max_length=100,
        primary_key=True,
        default='',
    )
    group = models.CharField(
        max_length=100,
        choices=Group.choices,
        default=Group.PULMONIC_CONSONANT,
    )

    def __str__(self):
        '''Custom display string'''
        return f'{self.glyph} ({self.slug}): {self.ipa_definition}'


class Mapping(models.Model):
    '''An organized system for mapping text to IPA glyphs'''

    slug = models.CharField(
        primary_key=True,
        max_length=100,
    )
    name = models.CharField(
        max_length=200,
    )
    description = models.TextField(
        blank=True,
    )
    glyphs = models.ManyToManyField(
        Glyph,
        through='Replacement',
        related_name='mappings',
        related_query_name='mapping',
    )

    def __str__(self):
        '''Custom display string'''
        return f'{self.name} Mapping'


class ReplacementQuerySet(models.QuerySet):
    '''Custom functions for Replacement.objects'''

    def longest_first(self):
        return self.order_by(models.functions.Length('text').desc())

    def get_by_natural_key(self, text, mapping):
        return self.get(
            text=text,
            mapping=mapping,
        )


class Replacement(models.Model):
    '''A specific text replacement for an IPA Glyph within a given Mapping'''

    class Meta:
        constraints = [
            models.UniqueConstraint(
                'text',
                'mapping',
                name='unique_text_glyph_mapping',
            )
        ]

    def natural_key(self):
        return (self.text, self.mapping)

    objects = ReplacementQuerySet.as_manager()

    text = models.CharField(
        max_length=20,
    )
    glyph = NamedForeignKey(
        'Glyph',
        on_delete=models.CASCADE,
        db_column='glyph_slug',
        id_suffix='slug',
        related_name='replacements',
    )
    mapping = NamedForeignKey(
        'Mapping',
        on_delete=models.CASCADE,
        db_column='mapping_slug',
        id_suffix='slug',
        related_name='replacements',
    )

    def __str__(self):
        return f'{self.mapping} from {self.text} to {self.glyph}'
