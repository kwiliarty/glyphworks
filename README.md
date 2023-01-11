# Glyphworks

## Setup

You will need:
- Docker and Docker-Compose

1. `git clone git@github.com:kwiliarty/glyphworks` and `cd glyphworks`
2. `cp docker/default.env ./override.env`
3. `source glyphworks.sh`
4. `gw-build-dev`
5. Set up [[#nginx-proxy and certs]]
6. Use `gw-bash` to open shell in the python container, then run `yarn install`
7. `docker-compose up -d`
8. `gw-migrate` to perform initial db setup
9. `gw-load-glyphs` to load the glyphs
10. `gw-collectstatic` to make static assets (fonts and favicon) work in styleguidist

### nginx-proxy and certs

You can theoretically set up the application using whatever networking paradigm you prefer, but this is what we recommend:

*NOTE: The dirs `docker/nginx` and `docker/certs` are not related to local dev, they are for the production deployment.*

1. `git clone git@github.com:nginx-proxy/nginx-proxy` and `cd nginx-proxy`
2. Replace the contents of `docker-compose.yml` with the [[#docker-compose.yml template]]
3. Add the following lines to your `/etc/hosts`  file
	```
	127.0.0.1 glyphworks.dev.test
	::1 glyphworks.dev.test
	127.0.0.1 styleguidist.dev.test
	::1 styleguidist.dev.test
	```
4. `docker network create nginx-proxy`
5. [[#Make certs]]
6. `docker-compose up [-d]`

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

1. [Install mkcert](https://github.com/FiloSottile/mkcert)
2. `mkcert -install`
3.  `cd ~/nginx-proxy/certs` and `mkcert glyphworks.dev.test styleguidist.dev.test "*.dev.test" dev.test localhost 127.0.0.1 ::1`
4. Rename the two generated files: 
	- `mv glyphworks.dev.test+6-key.pem server.key`
	- `mv glyphworks.dev.test+6.pem server.crt`
5. Make some symlinks (to make nginx happy):
	```
	ln -s server.crt glyphworks.dev.test.crt
	ln -s server.crt styleguidist.dev.test.crt
	ln -s server.key styleguidist.dev.test.key
	ln -s server.key styleguidist.dev.test.key
	```