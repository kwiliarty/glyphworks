#!/bin/bash

# Default environment variables are loaded from default.env.
# default.env is under version control and should not be overwritten.
# Overrides can be added to override.env which is ignored by git.

. ./docker/default.env
if [ -f "docker/override.env" ]
    then . ./docker/override.env
fi

# Base file for docker-compose
composefile="${location}/docker/docker-compose.yml"

# For dev
if [ $GW_ENV = 'dev' ]
then
   composefile="${composefile}:${location}/docker/docker-compose.dev.yml"
fi

# For test
if [ $GW_ENV = 'test' ]
then
    composefile="${composefile}:${location}/docker/docker-compose.test.yml"
fi

# For prod
if [ $GW_ENV = 'prod' ]
then
    composefile="${composefile}:${location}/docker/docker-compose.prod.yml"
fi

# For ci
if [ $GW_ENV = 'ci' ]
then
    composefile="${composefile}:${location}/docker/docker-compose.ci.yml"
fi

export COMPOSE_FILE=${composefile}

# We need to disable tty when we run on Gitlab
# This variable makes it easy for us to do that
DISABLE_TTY='-T'
if [[ $- == *i* ]]
then
    DISABLE_TTY=''
fi

# Create basic gw command
gw() {
    docker-compose exec $DISABLE_TTY -u root python "$@"
}

# Functions to manage image
gw_build_dev() {
    DOCKER_BUILDKIT=1 docker build \
        --tag kwiliarty/glyphworks:main-dev \
        --cache-from kwiliarty/glyphworks:main-dev \
        --build-arg BUILD_ENV='dev' \
        --build-arg WM_VERSION=${WM_VERSION} \
        --target dev \
        "$@" \
        .
}

gw_build_prod() {
    DOCKER_BUILDKIT=1 docker build \
        --tag kwiliarty/glyphworks:main \
        --cache-from kwiliarty/glyphworks:main \
        --build-arg BUILD_ENV='prod' \
        --build-arg WM_VERSION=${WM_VERSION} \
        --target prod \
        "$@" \
        .
}


## general aliases
alias gw-env='echo "$GW_ENV"'
alias gw-build-dev='gw_build_dev'
alias gw-build-ci='gw_build_ci'
alias gw-build-prod='gw_build_prod'
alias gw-pull-dev='docker pull kwiliarty/glyphworks:main-dev'
alias gw-pull-prod='docker pull kwiliarty/glyphworks:main'
alias gw-push-dev='docker push kwiliarty/glyphworks:main-dev'
alias gw-push-prod='docker push kwiliarty/glyphworks:main'
alias gw-down='docker-compose down'
alias gw-logs='docker-compose logs'
alias gw-open='open http://$(docker-compose port python 8000)'
alias gw-open-ssl='open https://glyphworks.dev.test/'
alias gw-show-urls='gw python manage.py show_urls'
#alias gw-pdb-docs='open https://docs.python.org/3/library/pdb.html'
alias gw-up='docker-compose up -d'
alias gw-up-tail='docker-compose up'
alias gw-status='docker-compose ps'
alias gw-eslint='gw yarn run eslint .'
alias gw-flake8='gw flake8 .'
alias gw-test-all='gw-eslint && gw-flake8'
alias gw-yarn-audit='gw yarn audit --groups dependencies'

## python aliases
alias gw-bash='docker-compose run -u root python /bin/bash'
alias gw-yarn='gw yarn'
alias gw-node='gw node'
alias gw-restart-python='docker-compose restart python'
alias gw-styleguide-open='open http://0.0.0.0:6060'
alias gw-collectstatic='gw python manage.py collectstatic --no-input'

## nginx aliases
alias gw-nginx='docker-compose exec nginx'
alias gw-nginx-shell='gw-nginx /bin/sh'
alias gw-nginx-reload='gw-nginx nginx -s reload'
