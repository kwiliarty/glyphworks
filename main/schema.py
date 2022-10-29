'''
GraphQL schema
'''
import graphene
from graphene_django import DjangoObjectType

from glyphs.models import Glyph


class GlyphType(DjangoObjectType):
    class Meta:
        model = Glyph
        fields = (
            'glyph',
            'hex_code',
            'combining',
            'ipa_definition',
            'ipa_number',
            'ipa_name',
            'slug',
            'group',
        )


class Query(graphene.ObjectType):
    glyphs = graphene.List(GlyphType)
    glyph = graphene.Field(
        GlyphType,
        slug=graphene.String(required=True),
    )

    def resolve_glyphs(root, info):
        return Glyph.objects.on_chart()

    def resolve_glyph(root, info, slug):
        try:
            return Glyph.objects.get(slug=slug)
        except Glyph.DoesNotExist:
            return None


schema = graphene.Schema(query=Query)
