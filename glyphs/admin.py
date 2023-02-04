from django.contrib import admin
from glyphs.models import Glyph, Map


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


class MapAdmin(admin.ModelAdmin):
    list_display = (
        'slug',
        'name',
        'description',
    )
    ordering = (
        'slug',
    )


admin.site.register(Glyph, GlyphAdmin)
admin.site.register(Map, MapAdmin)
