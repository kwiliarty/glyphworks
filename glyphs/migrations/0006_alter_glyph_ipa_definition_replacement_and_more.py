# Generated by Django 4.1.6 on 2023-02-12 16:52

from django.db import migrations, models
import django.db.models.deletion
import main.models


class Migration(migrations.Migration):

    dependencies = [
        ('glyphs', '0005_rename_map_mapping'),
    ]

    operations = [
        migrations.AlterField(
            model_name='glyph',
            name='ipa_definition',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
        migrations.CreateModel(
            name='Replacement',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=20)),
                ('glyph', main.models.NamedForeignKey(db_column='glyph_slug', on_delete=django.db.models.deletion.CASCADE, related_name='replacements', to='glyphs.glyph')),
                ('mapping', main.models.NamedForeignKey(db_column='mapping_slug', on_delete=django.db.models.deletion.CASCADE, related_name='replacements', to='glyphs.mapping')),
            ],
        ),
        migrations.AddField(
            model_name='mapping',
            name='glyphs',
            field=models.ManyToManyField(related_name='mappings', related_query_name='mapping', through='glyphs.Replacement', to='glyphs.glyph'),
        ),
        migrations.AddConstraint(
            model_name='replacement',
            constraint=models.UniqueConstraint(models.F('text'), models.F('mapping'), name='unique_text_glyph_mapping'),
        ),
    ]
