# import os

from . import shared

# BASE_DIR = shared.BASE_DIR
DEBUG = True
ALLOWED_HOSTS = ['*']
# LOGIN_URL = '/login/'

shared.apply(shared.for_all_envs, globals())
# shared.apply(shared.for_nonprod_envs, globals())

INSTALLED_APPS = shared.INSTALLED_APPS + [
]

# MIDDLEWARE = shared.MIDDLEWARE + [
# ]

TEMPLATES = shared.TEMPLATES
TEMPLATES[0]['OPTIONS']['debug'] = True

# SHELL_PLUS_POST_IMPORTS = shared.SHELL_PLUS_POST_IMPORTS

# This goes last!
try:
    from . import override
    shared.apply(override.overrides, globals())
except ImportError:
    pass
