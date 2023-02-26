# Inspired by https://sourcery.ai/blog/python-docker/

# Environment settings for all builds
FROM python:3.10.7-bullseye AS base

    # set up env
    ENV LC_ALL C.UTF-8
    ENV PYTHONDONTWRITEBYTECODE 1
    ENV PYTHONFAULTHANDLER 1
    ENV PYTHONUNBUFFERED 1
    ENV PYTHONHASHSEED random
    ENV POETRY_VERSION 1.3.2
    ENV POETRY_CACHE_DIR /poetry_cache
    # for the jedi cache
    ENV XDG_CACHE_HOME /xdg_cache

    ARG BUILD_ENV=prod

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

# Runtime elements shared by prod and dev
FROM base AS runtime

    WORKDIR /usr/src/app

    # Copy virtual env from python-deps stage
    COPY --from=python-deps /venv /venv
    ENV PATH="/venv/bin:$PATH"

    # Install node and yarn
    # https://github.com/nodesource/distributions#debinstall
    RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - && \
        curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor | tee /usr/share/keyrings/yarnkey.gpg >/dev/null && \
        echo "deb [signed-by=/usr/share/keyrings/yarnkey.gpg] https://dl.yarnpkg.com/debian stable main" | tee /etc/apt/sources.list.d/yarn.list && \
        apt-get clean && apt-get update && apt-get install -y nodejs yarn && \
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

    RUN apt-get update \
        && apt-get -y install graphviz \
        && rm -rf /var/lib/apt/lists/*

    # Switch to a new user
    USER appuser
