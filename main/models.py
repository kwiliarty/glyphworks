import sys
import uuid

from django.db import models
from django.conf import settings
from django.utils import timezone


class BaseModel(models.Model):

    class Meta:
        abstract = True


class NamedForeignKey(models.ForeignKey):
    '''Custom ForeignKey field with configurable id_suffix'''

    id_suffix = 'id'

    def __init__(self, *args, **kwargs):
        id_suffix = kwargs.pop('id_suffix', None)
        if id_suffix:
            self.id_suffix = id_suffix
        super().__init__(*args, **kwargs)

    def get_attname(self):
        return f'{self.name}_{self.id_suffix}'


class ProxySuper(models.Model):
    class Meta:
        abstract = True

    proxy_name = models.CharField(max_length=20)

    def save(self, *args, **kwargs):
        """ automatically store the proxy class name in the database """
        self.proxy_name = type(self).__name__
        super().save(*args, **kwargs)

    def __new__(cls, *args, **kwargs):
        """ create an instance corresponding to the proxy_name """
        proxy_class = cls
        try:
            field_name = ProxySuper._meta.get_fields()[0].name
            proxy_name = kwargs.get(field_name)
            if proxy_name is None:
                proxy_name_field_index = cls._meta.fields.index(
                    cls._meta.get_field(field_name))
                proxy_name = args[proxy_name_field_index]
            proxy_class = getattr(sys.modules[cls.__module__], proxy_name)
        finally:
            return super().__new__(proxy_class)


class ProxyManager(models.Manager):
    def get_queryset(self):
        """ only include objects in queryset matching current proxy class """
        return super().get_queryset().filter(proxy_name=self.model.__name__)


class OwnerMixin(models.Model):
    '''A mixin to add ownership behaviors to a Model'''

    class Meta:
        abstract = True

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="%(app_label)s_%(class)s_set",
        null=True,
        blank=True,
    )


class AuditMixin(models.Model):
    '''A mixin to add audit fields to a Model'''

    class Meta:
        abstract = True

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)


class UuidMixin(models.Model):
    '''Adds a uuid primary key to a model'''

    class Meta:
        abstract = True

    uuid = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )
