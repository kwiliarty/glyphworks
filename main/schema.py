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

    def resolve_glyphs(root, info):
        return Glyph.objects.all()


schema = graphene.Schema(query=Query)
