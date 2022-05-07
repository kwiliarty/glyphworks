# import os
# from celery.schedules import crontab

from . import shared
# from . import logging

# BASE_DIR = shared.BASE_DIR
DEBUG = False
ALLOWED_HOSTS = ['glyphworks.dev.test']
# LOGIN_URL = shared.LOGIN_URL

shared.apply(shared.for_all_envs, globals())
shared.apply(shared.for_nonprod_envs, globals())
# shared.apply(shared.ssl, globals())

INSTALLED_APPS = shared.INSTALLED_APPS + [
]

MIDDLEWARE = shared.MIDDLEWARE + [
]

TEMPLATES = shared.TEMPLATES
TEMPLATES[0]['OPTIONS']['debug'] = True

# AUTHENTICATION_BACKENDS = [
#     'django.contrib.auth.backends.ModelBackend',
# ]

# LOGGING = logging.get_logging(shared.site, 'test')

# This goes last!
try:
    from . import override
    shared.apply(override.overrides, globals())
except ImportError:
    pass
