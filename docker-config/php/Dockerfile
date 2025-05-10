FROM php:8.3-fpm
WORKDIR /var/www
COPY . /var/www

# permission
RUN chown -R www-data:www-data /var/www

# install composer (official recommended way)
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# install packages
RUN apt-get update \
  && apt-get install -y \
  gcc \
  make \
  git \
  unzip \
  vim \
  libpng-dev \
  libjpeg-dev \
  libfreetype6-dev \
  libpq-dev \
  curl \
  gnupg \
  openssl \
  && docker-php-ext-install pdo_pgsql pgsql \
  && docker-php-ext-configure gd --with-freetype --with-jpeg \
  && docker-php-ext-install -j$(nproc) gd \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Add php.ini
COPY php.ini /usr/local/etc/php/

# install stable node and latest npm
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
  && apt-get update \
  && apt-get install -y nodejs \
  && npm install -g n \
  && n stable \
  && npm install -g npm@latest \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# ホストのUID/GIDに合わせてwww-dataユーザーを変更
ARG UID=1000
ARG GID=1000
RUN groupmod -g $GID www-data && usermod -u $UID -g $GID www-data

# www-dataユーザーで実行
USER www-data