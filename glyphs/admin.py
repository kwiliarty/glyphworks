from django.contrib import admin
from glyphs.models import Glyph


class GlyphAdmin(admin.ModelAdmin):
    list_display = (
        'glyph',
        'ipa_definition',
        'hex_code',
        'ipa_number',
        'ipa_name',
        'slug',
        'group',
    )
    ordering = (
        'group',
        'ipa_number',
        'hex_code',
    )


admin.site.register(Glyph, GlyphAdmin)
