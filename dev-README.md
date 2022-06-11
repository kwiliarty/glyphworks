# GlyphWorks Dev Docs

## Glyphs

### Loading and dumping

Loading glyphs is build into the migration, so it will run on each deploy,
blowing away whatever is in the database and replacing it with whatever is in
the fixture file at `glyphs/fixtures/glyphs.json`. The good thing about this is
that the glyph definition is in version control. A bad and good thing about it
is that you shouldn't just edit the glyphs on the production instance unless you
do a dump and commit it. A good thing about it is that you can work things out
on dev and then cleanly apply them on production.

Related aliases:

    gw-dump-glyphs
    gw-load-glyphs
