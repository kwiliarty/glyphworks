from django.db import models


class GlyphQuerySet(models.QuerySet):
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
        unique=True,
        blank=True,
        null=True,
    )
    ipa_number = models.CharField(
        max_length=5,
        default='',
        blank=True,
        null=True,
    )
    ipa_name = models.CharField(
        max_length=100,
        default='',
        blank=True,
        null=True,
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
