import os

from . import shared
from . import logging

BASE_DIR = shared.BASE_DIR
DEBUG = True
ALLOWED_HOSTS = ['*']
LOGIN_URL = '/login/'

shared.apply(shared.for_all_envs, globals())
shared.apply(shared.for_nonprod_envs, globals())

INSTALLED_APPS = shared.INSTALLED_APPS + [
    'django.contrib.admindocs',
]

MIDDLEWARE = shared.MIDDLEWARE + [
]

TEMPLATES = shared.TEMPLATES
TEMPLATES[0]['OPTIONS']['debug'] = True

LOGGING = logging.get_logging(shared.site, 'ci')

EMAIL_BACKEND = 'django.core.mail.backends.dummy.EmailBackend'

# CELERY and REDIS related settings
shared.apply(shared.CELERY_SETTINGS, globals())

# Caches
CACHES = {
    'default': shared.get_cache('dummy', 'ci'),
    'api': shared.get_cache('dummy', 'ci'),
    'session': shared.get_cache('session', 'ci'),
    'strings': shared.get_cache('dummy', 'ci'),
}
