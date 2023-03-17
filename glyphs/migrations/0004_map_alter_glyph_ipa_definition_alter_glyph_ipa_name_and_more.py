# Generated by Django 4.1.6 on 2023-02-05 08:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('glyphs', '0003_alter_glyph_options'),
    ]

    operations = [
        migrations.CreateModel(
            name='Map',
            fields=[
                ('slug', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=200)),
                ('description', models.TextField(blank=True)),
            ],
        ),
        migrations.AlterField(
            model_name='glyph',
            name='ipa_definition',
            field=models.CharField(blank=True, default='', max_length=100, unique=True),
        ),
        migrations.AlterField(
            model_name='glyph',
            name='ipa_name',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='glyph',
            name='ipa_number',
            field=models.CharField(blank=True, default='', max_length=5),
        ),
    ]