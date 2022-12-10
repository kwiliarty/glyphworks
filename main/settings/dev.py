# import os

from . import shared

# BASE_DIR = shared.BASE_DIR
DEBUG = True
ALLOWED_HOSTS = ['*']
# LOGIN_URL = '/login/'
CSRF_TRUSTED_ORIGINS = [
    'http://0.0.0.0',
    'https://glyphworks.dev.test',
]

shared.apply(shared.for_all_envs, globals())
# shared.apply(shared.for_nonprod_envs, globals())

ROOT_URLCONF = 'main.urls.dev'

INSTALLED_APPS = shared.INSTALLED_APPS + [
    'watchfiles_reloader',
]

# Allow react dev tools in dev
CSP_SCRIPT_SRC = (
    "'self'",
    "'unsafe-inline'",
    # graphql explorer
    'cdn.jsdelivr.net',
    "'unsafe-eval'",
)

CSP_STYLE_SRC = (
    # graphql explorer
    'cdn.jsdelivr.net',
    "'unsafe-inline'",
)

MIDDLEWARE = shared.MIDDLEWARE + [
]

TEMPLATES = shared.TEMPLATES
TEMPLATES[0]['OPTIONS']['debug'] = True

# SHELL_PLUS_POST_IMPORTS = shared.SHELL_PLUS_POST_IMPORTS

# This goes last!
try:
    from . import override
    shared.apply(override.overrides, globals())
except ImportError:
    pass
