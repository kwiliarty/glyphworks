from django.core.management import call_command
from django.core.management.commands.migrate import Command as CoreMigrateCommand
from glyphs import models


class Command(CoreMigrateCommand):

    def handle(self, *args, **kwargs):

        # Do normal migration
        print('Running core migration')
        super().handle(*args, **kwargs)

        # After the migration is complete we can do some post-migration tasks
        print('Migration complete, starting post-migration tasks')

        # Remove Glyph data
        print('Removing replacements, mappings and glyphs')
        models.Replacement.objects.all().delete()
        models.Mapping.objects.all().delete()
        models.Glyph.objects.all().delete()

        # Load glyphs
        print('Loading glyphs')
        call_command('loaddata', 'glyphs.yaml', app='glyphs')

        # Load mappings
        print('Loading mappings')
        call_command('loaddata', 'mappings.yaml', app='glyphs')

        # Load replacements
        print('Loading replacements')
        call_command('loaddata', 'replacements.yaml', app='glyphs')
