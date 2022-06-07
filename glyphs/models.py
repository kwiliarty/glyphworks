from django.db import models


class Glyph(models.Model):

    class GlyphGroup(models.TextChoices):
        PULMONIC_CONSONANT = 'PC', 'pulmonic consonant'
        NON_PULMONITC_CONSONANT = 'NPC', 'non-pulmonic consonant'
        OTHER_SYMBOL = 'OT', 'other symbol'
        VOWEL = 'V', 'vowel'
        DIACRITIC = 'D', 'diacritic'
        SUPRASEGMENTAL = 'SS', 'suprasegmental'
        TONE = 'T', 'tone or word accent'
        NOT_ON_CHART = 'NOC', 'not on chart'

    glyph = models.CharField(
        max_length=5,
        unique=True,
    )
    hex_code = models.CharField(
        max_length=4,
        unique=True,
    )
    combining = models.BooleanField(
        default=False,
    )
    ipa_definition = models.CharField(
        max_length=100,
    )
    ipa_number = models.CharField(
        max_length=5,
        unique=True,
    )
    ipa_name = models.CharField(
        max_length=100,
        unique=True,
    )
    slug = models.CharField(
        max_length=100,
        primary_key=True,
    )
    group = models.CharField(
        max_length=100,
        choices=GlyphGroup.choices,
    )

    def __str__(self):
        return f'{self.glyph} ({self.ipa_name}): {self.ipa_definition}'
