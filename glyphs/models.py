from django.db import models


class Glyph(models.Model):
    glyph = models.CharField(max_length=5)

    def __str__(self):
        return f'{self.glyph}'
