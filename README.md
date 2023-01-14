# Glyphworks

## Setup

You will need:
- Docker and Docker-Compose

1. `git clone git@github.com:kwiliarty/glyphworks && cd glyphworks`
1. `cp docker/default.env docker/override.env`
1. `source glyphworks.sh`
1. `gw-build-dev`
1. Set up [nginx-proxy and certs](#nginx-proxy-and-certs)
1. `gw-yarn install` to run `yarn install` in your main application container
1. `docker-compose up -d`
1. `gw-migrate` to perform initial db setup
1. `gw-collectstatic` to make static assets (fonts and favicon) work in styleguidist
1. Visit your application at https://glyphworks.dev.test
1. Visit the style guide at https://styleguidist.dev.test

### nginx-proxy and certs

You can theoretically set up the application using whatever networking paradigm you prefer, but this is what we recommend:

*NOTE: The dirs `docker/nginx` and `docker/certs` are not related to local dev, they are for the production deployment.*

1. Outside of the application directory: `git clone git@github.com:nginx-proxy/nginx-proxy && cd nginx-proxy`
1. Replace the contents of `docker-compose.yml` with the [docker-compose.yml template](#docker-composeyml-template)
1. Add the following lines to your `/etc/hosts` file
	```
	127.0.0.1 glyphworks.dev.test
	::1 glyphworks.dev.test
	127.0.0.1 styleguidist.dev.test
	::1 styleguidist.dev.test
	```
1. `docker network create nginx-proxy`
1. [Make certs](#make-certs)
1. `docker-compose up -d`

#### docker-compose.yml template

```
version: '3.8'

services:
  nginx-proxy:
    image: jwilder/nginx-proxy
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/tmp/docker.sock:ro
      - ./certs:/etc/nginx/certs

networks:
  default:
    name: nginx-proxy
```

#### Make certs

As above, you can do certs however you want, but this is the recommended approach that we have found to be easiest:

1. Install [mkcert](https://github.com/FiloSottile/mkcert)
2. `mkcert -install`
3.  `cd ~/nginx-proxy/certs && mkcert glyphworks.dev.test styleguidist.dev.test "*.dev.test" dev.test localhost 127.0.0.1 ::1`
4. Rename the two generated files: 
	- `mv glyphworks.dev.test+6-key.pem server.key`
	- `mv glyphworks.dev.test+6.pem server.crt`
5. Make some symlinks (to make nginx happy):
	```
	ln -s server.crt glyphworks.dev.test.crt
	ln -s server.crt styleguidist.dev.test.crt
	ln -s server.key glyphworks.dev.test.key
	ln -s server.key styleguidist.dev.test.key
	```

## Development environment

### Bash aliases

Sourcing `glyphworks.sh` in a bash shell loads up a bunch of aliases that make
it easier to work the application. Some of these aliases work only in bash. All
of them start with `gw-`. Read the `glyphworks.sh` file to see what's available.

### Django dev server

The main application runs on the Django dev server in the `python` container.
This server restarts the application automatically when you modify python files.

### Webpack dev server

The dev stack runs webpack in a container. Webpack picks up and reprocesses any
changes you make to the front-end application code.

### Styleguidist

Styleguidist runs in its own container and reloads when you make changes to the
front-end code.

## Managing glyphs

The Glyphs are somewhere between configuration and data, so we manage them using
a fixture file at `glyphs/fixtures/glyphs.json`. We've modified the Django
migration process so that glyphs are loaded from the fixture file on each
migration. If you are changing glyphs in the application you'll need to dump
them to update the fixture file. Relevant aliases:
  ```
  gw-load-glyphs
  gw-dump-glyphs
  ```

## Testing

Assuming you have sourced the `glyphworks.sh` file…

### Python/Django unit tests

Run `gw-unit-test` to kick off a round of unit tests on the back-end application
code. 

### Jest

Run `gw-jest-watch` to launch a session that detects changes to your code
and runs relevant jest tests. The interface provides a variety of options that
you can explore.

### Cypress (in a container)

Run `gw-cypress-run` to run Cypress end-to-end tests headlessly in a container.

### Cypress (local)

This is not necessary, and it can be a bit fussy, but it provides a better
test-writing experience.

1. Outside the application create a `node_modules` and a `yarn_cache` folder,
for instance:
  ```
  /home/<username>/glyphworks/node_modules
  /home/<username>/glyphworks/yarn_cache
  ```
1. Based on the paths above, set some variables in `docker/override.env`
  ```
  export YARN_MODULES_FOLDER='/home/<username>/glyphworks/node_modules'
  export YARN_CACHE_FOLDER='/home/<username>/glyphworks/yarn_cache'
  ```
1. `gw-local-yarn install` to install the modules for local use
1. `gw-local-cypress-run` to run the tests locally
1. `gw-local-cypress-open` to open the rich testing IDE
