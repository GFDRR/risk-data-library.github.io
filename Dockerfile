FROM ruby:2.6

ADD . /app
WORKDIR /app

COPY package*.json ./
RUN npm install

EXPOSE 4000

RUN bundle install