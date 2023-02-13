from django.contrib import admin
from glyphs.models import Glyph, WritingSystem  # , Replacement


class GlyphAdmin(admin.ModelAdmin):
    pass


class WritingSystemAdmin(admin.ModelAdmin):
    list_display = (
        'slug',
        'name',
        'description',
    )
    ordering = (
        'slug',
    )


# class ReplacementAdmin(admin.ModelAdmin):
#     list_display = (
#         'text',
#         'glyph',
#         'mapping',
#         'alphabet',
#     )
#     ordering = (
#         'text',
#     )


admin.site.register(Glyph, GlyphAdmin)
admin.site.register(WritingSystem, WritingSystemAdmin)
# admin.site.register(Replacement, ReplacementAdmin)
