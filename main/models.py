from django.db import models


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
