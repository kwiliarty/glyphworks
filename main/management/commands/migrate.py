from django.core.management import call_command
from django.core.management.commands.migrate import Command as CoreMigrateCommand


class Command(CoreMigrateCommand):

    def handle(self, *args, **kwargs):

        # Do normal migration
        print('Running core migration')
        super().handle(*args, **kwargs)

        # After the migration is complete we can do some post-migration tasks
        print('Migration complete, starting post-migration tasks')

        # Load glyphs
        print('Loading glyphs')
        call_command('loaddata', 'glyphs.yaml', app='glyphs')

        # Load maps
        print('Loading maps')
        call_command('loaddata', 'maps.yaml', app='glyphs')
