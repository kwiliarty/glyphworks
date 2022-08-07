#!/bin/bash

# Default environment variables are loaded from default.env.
# default.env is under version control and should not be overwritten.
# Overrides can be added to override.env which is ignored by git.

export COMPOSE_COMPATIBILITY=true

. ./docker/default.env
if [ -f "docker/override.env" ]
    then . ./docker/override.env
fi

# Base file for docker-compose
composefile="${location}/docker/docker-compose.yml"

# For dev
if [ $GW_ENV = 'dev' ]
then
   composefile="${composefile}:${location}/docker/docker-compose.dev.yml:${location}/docker/docker-compose.cypress.yml"
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
    composefile="${composefile}:${location}/docker/docker-compose.ci.yml:${location}/docker/docker-compose.cypress.yml"
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

# Reset the test database
gw_reset_db_test() {
    docker-compose restart python-test
    docker-compose exec $DISABLE_TTY python-test ./manage.py reset_db --noinput -c
    docker-compose exec $DISABLE_TTY python-test ./manage.py migrate
    docker-compose restart python-test
}

# Functions to manage image
gw_build_dev() {
    DOCKER_BUILDKIT=1 docker build \
        --tag kwiliarty/glyphworks:main-dev \
        --cache-from kwiliarty/glyphworks:main-dev \
        --build-arg BUILD_ENV='dev' \
        --target dev \
        "$@" \
        .
}

gw_build_prod() {
    DOCKER_BUILDKIT=1 docker build \
        --tag kwiliarty/glyphworks:main \
        --cache-from kwiliarty/glyphworks:main \
        --build-arg BUILD_ENV='prod' \
        --target prod \
        "$@" \
        .
    for tag in $(git tag --points-at HEAD)
    do docker tag kwiliarty/glyphworks:main kwiliarty/glyphworks:${tag}
    done
}

gw_push_prod() {
    docker push kwiliarty/glyphworks:main
    for tag in $(git tag --points-at HEAD)
    do docker push kwiliarty/glyphworks:${tag}
    done
}

gw_pull_prod() {
    docker pull kwiliarty/glyphworks:${1-main}
}

gw_deploy() {
    gw_pull_prod ${1-main}
    docker tag kwiliarty/glyphworks:${1-main} kwiliarty/glyphworks:main
    docker-compose up -d
    gw ./manage.py migrate
    gw ./manage.py collectstatic --no-input
}

# Function to run site in any environment
gw_mk_env() {
    ENV=$1
    if [ ! $(docker container ls -q -f name=$ENV) ]
    then
        INST=
        if [ $ENV = 'dev' ]
        then
            INST=${ENV}
        fi
        HCS=
        if [ $ENV = 'ci' ]
        then
            CS="-e CYPRESS_SERVER=True"
        fi
        docker-compose run \
            -d \
            --rm \
            --name ${ENV} --no-deps \
            -p 0:8000 \
            -e GW_ENV=$ENV \
            -e GW_INSTANCE=$INST \
            -e DJANGO_SETTINGS_MODULE=main.settings.$ENV \
            $CS \
            python
    fi
}

# Function to open site in any environment
gw_open_env() {
    ENV=$1
    if [ ! $(docker container ls -q -f name=$ENV) ]
    then
        gw_mk_env $ENV
        sleep 3
    fi
    open http://$(docker port $ENV 8000)
}

# Function to drop site in any env
gw_rm_env() {
    ENV=$1
    if [ $(docker container ls -q -f name=$ENV) ]
    then
        docker rm -f $ENV
    fi
}

# Invoke local cypress
gw_local_cypress() {
    NODE_PATH=${YARN_MODULES_FOLDER} yarn \
        --modules-folder ${YARN_MODULES_FOLDER} \
        --cache-folder ${YARN_CACHE_FOLDER} \
        run cypress \
        "$@"
}

# Run cypress tests locally
gw_local_cypress_run() {

    echo "Resetting the test database"
        gw_reset_db_test

    echo "Running the tests"
        gw_local_cypress run \
        --config "video=false,baseUrl=http://$(docker-compose port python-test 8000)" \
        --spec "cypress/e2e/main/*" \
        --browser 'chrome' \
        "$@"
    EXIT_CODE=$?

    return $EXIT_CODE
}

# Open cypress IDE locally
gw_local_cypress_open() {

    echo "Resetting the test database"
        docker-compose restart python-test
        docker-compose exec $DISABLE_TTY python-test ./manage.py reset_db --noinput -c
        docker-compose exec $DISABLE_TTY python-test ./manage.py migrate

    echo "Opening the IDE"
        gw_local_cypress open \
        --config "video=false,baseUrl=http://$(docker-compose port python-test 8000)" \
        "$@"
}

# Run cypress tests in a container
gw_cypress_run() {

    echo "Running containerized cypress tests"

    echo "Resetting the test database"
        gw_reset_db_test

    echo "Copying files to cypress container"
    docker cp . glyphworks_cypress_1:/usr/src/app

    echo "Running the tests"
    docker-compose exec \
        $DISABLE_TTY \
        -e CYPRESS_BASE_URL=http://python-test:8000 \
        cypress npx cypress run \
        --spec "cypress/e2e/main/*" \
        --browser chrome \
        --config video=false \
        "$@"
    EXIT_CODE=$?

    return $EXIT_CODE
}

## general aliases
alias gw-env='echo "$GW_ENV"'
alias gw-build-dev='gw_build_dev'
alias gw-build-ci='gw_build_ci'
alias gw-build-prod='gw_build_prod'
alias gw-pull-dev='docker pull kwiliarty/glyphworks:main-dev'
alias gw-pull-prod='gw_pull_prod'
alias gw-push-dev='docker push kwiliarty/glyphworks:main-dev'
alias gw-push-prod='gw_push_prod'
alias gw-down='docker-compose down'
alias gw-logs='docker-compose logs'
alias gw-open='open http://$(docker-compose port python 8000)'
alias gw-reset-db-test='gw_reset_db_test'
alias gw-open-test='gw_reset_db_test && open http://$(docker-compose port python-test 8000)'
alias gw-open-ssl='open https://glyphworks.dev.test/'
alias gw-mk-env='gw_mk_env'
alias gw-open-env='gw_open_env'
alias gw-rm-env='gw_rm_env'
alias gw-show-urls='gw python manage.py show_urls'
#alias gw-pdb-docs='open https://docs.python.org/3/library/pdb.html'
alias gw-up="docker-compose up -d && if [ ${GW_ENV} != 'prod' ]; then gw yarn install --frozen-lockfile; fi"
alias gw-up-tail='docker-compose up'
alias gw-status='docker-compose ps'
alias gw-eslint='gw yarn run eslint .'
alias gw-flake8='echo "running flake8" && gw flake8 .'
alias gw-yarn-audit='gw yarn audit --groups dependencies'
alias gw-pip-audit='gw pip-audit'
alias gw-local-yarn="yarn --modules-folder ${YARN_MODULES_FOLDER} --cache-folder ${YARN_CACHE_FOLDER}"
alias gw-jest='gw yarn jest'
alias gw-jest-watch='gw yarn jest --watch'
alias gw-local-cypress-run='gw_local_cypress_run'
alias gw-local-cypress-open='gw_local_cypress_open'
alias gw-cypress-run='gw_cypress_run'
alias gw-unit-test='gw ./manage.py test --settings main.settings.ci'
alias gw-unit-test-deprecated='gw python -Wa ./manage.py test --settings main.settings.ci'
alias gw-test-fast='gw-eslint && gw-flake8 && gw-yarn-audit && gw-pip-audit && gw-jest && gw-unit-test'
alias gw-test-all='gw-test-fast && gw-cypress-run'
alias gw-shell-plus='gw ./manage.py shell_plus'
alias gw-migrate='gw python ./manage.py migrate'
alias gw-dump-glyphs='gw python ./manage.py dumpdata glyphs.Glyph --all --indent 2 --output glyphs/fixtures/glyphs.json'
alias gw-load-glyphs='gw python ./manage.py loaddata glyphs.json'

## postgres aliases
alias gw-db='docker-compose exec db psql -U postgres'

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

## last things
alias gw-deploy='gw_deploy'
