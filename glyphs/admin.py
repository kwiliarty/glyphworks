from django.contrib import admin
from glyphs.models import Glyph, Mapping, Replacement


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


class MappingAdmin(admin.ModelAdmin):
    list_display = (
        'slug',
        'name',
        'description',
    )
    ordering = (
        'slug',
    )


class ReplacementAdmin(admin.ModelAdmin):
    list_display = (
        'text',
        'glyph',
        'mapping',
    )
    ordering = (
        'text',
    )


admin.site.register(Glyph, GlyphAdmin)
admin.site.register(Mapping, MappingAdmin)
admin.site.register(Replacement, ReplacementAdmin)
