# Generated by Django 4.0.6 on 2022-07-16 14:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('glyphs', '0002_remove_glyph_id_glyph_combining_glyph_group_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='glyph',
            options={'ordering': ['ipa_number']},
        ),
    ]