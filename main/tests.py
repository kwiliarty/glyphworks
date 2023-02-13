from django.test import TestCase
from django.db import models
from main.models import NamedForeignKey, ProxySuper, ProxyManager


class NamedForeignKeyTest(TestCase):

    class TestModel(models.Model):
        id = models.AutoField(primary_key=True)
        target = NamedForeignKey(
            'Target',
            db_column='target_slug',
            on_delete=models.CASCADE,
            id_suffix='slug',
            related_name='tests',
        )

    class Target(models.Model):
        slug = models.CharField(
            max_length=100,
            primary_key=True,
            default='',
        )

    def test_named_foreign_key(self):
        target = self.Target.objects.create(slug='target')
        test = self.TestModel.objects.create(
            target=target,
        )

        self.assertEqual(test.target, target)
        self.assertEqual('target_slug', test._meta.get_fields()[-1].attname)
        self.assertEqual('target_slug', test._meta.get_fields()[-1].column)


class SuperProxyTest(TestCase):
    '''See: https://stackoverflow.com/questions/241250/single-table-inheritance-in-django'''

    class WritingSystem(ProxySuper):
        id = models.AutoField(primary_key=True)

    class Alphabet(WritingSystem):
        class Meta:
            proxy = True

        objects = ProxyManager()

    def test_enhanced_proxy_models(self):
        writing_system = self.WritingSystem.objects.create()
        alphabet = self.Alphabet.objects.create()

        self.assertTrue(hasattr(writing_system, 'id'))
        self.assertTrue(hasattr(writing_system, 'proxy_name'))
        self.assertEqual(writing_system.proxy_name, 'WritingSystem')
        self.assertEqual(writing_system._meta.db_table, 'main_writingsystem')

        self.assertTrue(hasattr(alphabet, 'id'))
        self.assertTrue(hasattr(alphabet, 'proxy_name'))
        self.assertEqual(alphabet.proxy_name, 'Alphabet')
        self.assertEqual(alphabet._meta.db_table, 'main_writingsystem')

        self.assertEqual(self.WritingSystem.objects.count(), 2)
        self.assertEqual(self.Alphabet.objects.count(), 1)
