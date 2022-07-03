# import os
# from celery.schedules import crontab

from . import shared
# from . import logging

# BASE_DIR = shared.BASE_DIR
DEBUG = False
ALLOWED_HOSTS = ['glyph.works']
CSRF_TRUSTED_ORIGINS = ['https://glyph.works']
# LOGIN_URL = shared.LOGIN_URL

shared.apply(shared.for_all_envs, globals())
# shared.apply(shared.ssl, globals())

INSTALLED_APPS = shared.INSTALLED_APPS + [
]

MIDDLEWARE = shared.MIDDLEWARE + [
]

TEMPLATES = shared.TEMPLATES
TEMPLATES[0]['OPTIONS']['debug'] = False

# AUTHENTICATION_BACKENDS = [
#     'django.contrib.auth.backends.ModelBackend',
# ]

# LOGGING = logging.get_logging(shared.site, 'prod')

# This goes last!
try:
    from . import override
    shared.apply(override.overrides, globals())
except ImportError:
    pass
