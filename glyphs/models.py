from django.db import models


class Glyph(models.Model):
    glyph = models.CharField(max_length=5)
