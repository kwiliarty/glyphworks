# Inspired by https://sourcery.ai/blog/python-docker/

# Environment settings for all builds
FROM python:3.9.10-bullseye AS base

    # set up env
    ENV LC_ALL C.UTF-8
    ENV PYTHONDONTWRITEBYTECODE 1
    ENV PYTHONFAULTHANDLER 1
    ENV PYTHONUNBUFFERED 1
    ENV DJANGO_WATCHMAN_TIMEOUT 20

    ARG BUILD_ENV=prod
    ARG WM_VERSION

# Python dependencies
FROM base AS python-deps

    # Install pipenv and compilation dependencies
    RUN pip install pipenv

    # Install python dependencies in /.venv
    COPY Pipfile .
    COPY Pipfile.lock .

    RUN if [ ${BUILD_ENV} = 'prod' ]; \
        then PIPENV_VENV_IN_PROJECT=1 pipenv install; \
        else PIPENV_VENV_IN_PROJECT=1 pipenv install --dev; \
        fi

# Watchman, for dev
FROM base AS watchman

    RUN apt-get update && apt-get install -y inotify-tools
    RUN wget https://github.com/facebook/watchman/releases/download/${WM_VERSION}/watchman-${WM_VERSION}-linux.zip
    RUN unzip watchman-$WM_VERSION-linux.zip

# Runtime elements shared by prod and dev
FROM base AS runtime

    WORKDIR /usr/src/app

    # Copy virtual env from python-deps stage
    COPY --from=python-deps /.venv /.venv
    ENV PATH="/.venv/bin:$PATH"

    # Install node and yarn
    # https://github.com/nodesource/distributions#debinstall
    RUN curl -fsSL https://deb.nodesource.com/setup_17.x | bash - && \
        curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor | tee /usr/share/keyrings/yarnkey.gpg >/dev/null && \
        echo "deb [signed-by=/usr/share/keyrings/yarnkey.gpg] https://dl.yarnpkg.com/debian stable main" | tee /etc/apt/sources.list.d/yarn.list && \
        apt-get update && apt-get install -y nodejs yarn && \
        rm -rf /var/lib/apt/lists/*

    # Install node packages
    COPY package.json package.json
    COPY yarn.lock yarn.lock
    COPY .yarnrc .yarnrc
    RUN if [ ${BUILD_ENV} = 'prod' ]; \
        then yarn install --frozen-lockfile --production; \
        fi

    # Create appuser, we'll switch to it later
    RUN useradd --home-dir /usr/src/app appuser
    RUN pip install pipenv

# Production
FROM runtime AS prod

    COPY . .
    RUN npm run build
    RUN /node_modules/.bin/webpack --config webpack.config.js --mode production

    # Switch to a new user
    USER appuser

# Dev
From runtime AS dev

    # Copy the watchman executable from watchman stage
    COPY --from=watchman /usr/bin/inotify* /usr/bin
    RUN mkdir -p /usr/local/{bin,lib} /usr/local/var/run/watchman
    COPY --from=watchman /watchman-$WM_VERSION-linux/bin/* /usr/local/bin
    COPY --from=watchman /watchman-$WM_VERSION-linux/lib/* /usr/local/lib
    RUN chmod 755 /usr/local/bin/watchman
    RUN chmod 2777 /usr/local/var/run/watchman

    # Switch to a new user
    USER appuser
