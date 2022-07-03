"""
Django settings for main project.

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.0/ref/settings/
"""

import os

# Hack because graphene_django does not support Django 4 yet
# https://stackoverflow.com/a/70833150/2079708
import django
from django.utils.encoding import force_str
django.utils.encoding.force_text = force_str


# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


def apply(dictionary, symbols):
    for k, v in dictionary.items():
        symbols[k] = v


# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False
ALLOWED_HOSTS = []


def db_host():
    if os.getenv('CYPRESS_SERVER', False):
        return 'db-test'
    return 'db'


# Define base config for DATABASES
default_db = {
    'ENGINE': 'django.db.backends.postgresql',
    'NAME': 'postgres',
    'USER': 'postgres',
    'PASSWORD': os.getenv('POSTGRES_PASSWORD'),
    'HOST': db_host(),
    'PORT': 5432,
}

for_all_envs = {
    'SECRET_KEY': os.getenv('SECRET_KEY', '@b0-*s6$dm_7s8t6^k5po*ey^yi6-@vu^z2=-w2(cpk_@j0qe@'),
    'ROOT_URLCONF': 'main.urls.shared',
    # 'LANGUAGE_CODE': 'en-us',
    # 'TIME_ZONE': 'America/New_York',
    # 'USE_I18N': False,
    # 'USE_L10N': False,
    # 'USE_TZ': True,
    'DATABASES': {
        'default': {
            **default_db,
        },
        'test': {
            **default_db,
        },
    },

    'STATIC_URL': '/static/',
    'STATIC_ROOT': '/usr/src/app/static/',
    'STATICFILES_DIRS': [os.path.join(BASE_DIR, 'main/assets/')],  # webpack
    'WEBPACK_LOADER': {
        'DEFAULT': {
            'BUNDLE_DIR_NAME': 'bundles/',
            'STATS_FILE': os.path.join(BASE_DIR, 'main/webpack-stats.json'),
        },
    },
    'GRAPHENE': {
        'SCHEMA': 'main.schema.schema',
    },
}

for_nonprod_envs = {
}

ssl = {
    'SECURE_SSL_REDIRECT': True,
    'SESSION_COOKIE_SECURE': True,
    'CSRF_COOKIE_SECURE': True,
    'SECURE_HSTS_SECONDS': 31536000,
    'SECURE_HSTS_INCLUDE_SUBDOMAINS': True,
    'SECURE_HSTS_PRELOAD': True,
}

# Application definition

CORE_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.messages',
    'django.contrib.sessions',
    'django.contrib.staticfiles',
]

THIRD_PARTY_APPS = [
    'django_extensions',
    'graphene_django',
    'webpack_loader',
]

CUSTOM_APPS = [
    # good place to include custom admin configs
    # ***.apps.***Config, for instance
    'main',
    'glyphs',
]

INSTALLED_APPS = CORE_APPS + THIRD_PARTY_APPS + CUSTOM_APPS

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'main/templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'debug': False,
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


# REDIS related settings
REDIS_HOST = 'redis'
REDIS_PORT = '6379'
REDIS_PASSWORD = os.getenv('REDIS_PASSWORD')

# Caches
CACHES = {
}


def get_cache(type, env):
    '''
    Gets a cache and sets env as a KEY_PREFIX
    type: One of the caches defined above
    env: The environment to use as the key.
    '''
    cache = CACHES[type]
    cache['KEY_PREFIX'] = env
    return cache


# This dict will need to be applied in each environment
CELERY_SETTINGS = {
    'REDIS_HOST': 'redis',
    'REDIS_PORT': '6379',
    'CELERY_BROKER_URL': f'redis://:{REDIS_PASSWORD}@{REDIS_HOST}:{REDIS_PORT}/0',
    'CELERY_RESULT_BACKEND': f'redis://:{REDIS_PASSWORD}@{REDIS_HOST}:{REDIS_PORT}/0',
    'CELERY_BROKER_TRANSPORT_OPTIONS': {'visibility_timeout': 3600},
    'CELERY_ACCEPT_CONTENT': ['application/json'],
    'CELERY_TASK_SERIALIZER': 'json',
    'CELERY_RESULT_SERIALIZER': 'json',
    'CELERY_BEAT_SCHEDULE_FILENAME': '/var/log/celery/celerybeat-schedule',
    'CELERY_ENABLE_UTC': False,
    'CELERY_TIMEZONE': 'America/New_York',
}

SHELL_PLUS = 'ipython'
SHELL_PLUS_POST_IMPORTS = [
    ('pprint', ('pprint')),
]
