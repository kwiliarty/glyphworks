# Inspired by https://sourcery.ai/blog/python-docker/

# Environment settings for all builds
FROM python:3.9.10-bullseye AS base

    # set up env
    ENV LC_ALL C.UTF-8
    ENV PYTHONDONTWRITEBYTECODE 1
    ENV PYTHONFAULTHANDLER 1
    ENV PYTHONUNBUFFERED 1
    ENV PYTHONHASHSEED random
    ENV DJANGO_WATCHMAN_TIMEOUT 20
    ENV POETRY_VERSION 1.1.13

    ARG BUILD_ENV=prod
    ARG WM_VERSION

# Python dependencies
FROM base AS python-deps

    # Guidance on poetry in a docker build:
    # https://stackoverflow.com/a/57886655/2079708
    ENV PIP_DEFAULT_TIMEOUT 100
    ENV PIP_DISABLE_PIP_VERSION_CHECK 1
    ENV PIP_NO_CACHE_DIR 1

    WORKDIR /usr/src/app

    RUN pip install "poetry==$POETRY_VERSION"
    RUN python -m venv /venv

    COPY pyproject.toml poetry.lock ./
    RUN if [ ${BUILD_ENV} = 'prod' ]; \
        then poetry export -f requirements.txt | /venv/bin/pip install -r /dev/stdin; \
        else poetry export -f requirements.txt --dev | /venv/bin/pip install -r /dev/stdin; \
        fi

    # Potentially this, too
    # COPY . .
    # RUN poetry build && /venv/bin/pip install dist/*.whl

# Watchman, for dev
FROM base AS watchman

    RUN apt-get update && apt-get install -y inotify-tools
    RUN wget https://github.com/facebook/watchman/releases/download/${WM_VERSION}/watchman-${WM_VERSION}-linux.zip
    RUN unzip watchman-$WM_VERSION-linux.zip

# Runtime elements shared by prod and dev
FROM base AS runtime

    WORKDIR /usr/src/app

    # Copy virtual env from python-deps stage
    COPY --from=python-deps /venv /venv
    ENV PATH="/venv/bin:$PATH"

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
    # RUN pip install pipenv
    RUN pip install "poetry==$POETRY_VERSION"

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
