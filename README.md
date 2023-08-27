# NODE-BLOG-BACKEND-API

Simple API for blog that have users, posts and comments

## Get started

Edit the env.sample created for you by default, edit it with your basic info then run:

`yarn dev`

to start your server.

## Available scripts

### Dev

This script runs your typescript code with ts node and automatically restarts the server when there are changes to files.

`yarn dev`

### Build

This script compiles your typescript code into javascript and stores it in the build folder. if there's not build folder, it creates one automatically
for you.

`yarn build`

### Start

This runs your javascript files directly. Use this command to run your servers in production.

`yarn start`

### Migrate

Sequelize is used under the hood as an ORM & by default it's configured for postgres databases. This command runs all your sequelize migrations. You
can also use `migrate:u` to undo last migration or `migrate:u:a` to undo all migrations

`yarn migrate`

`yarn migrate:u`

`yarn migrate:u:a`

### Test

This runs all the necessary commands to create a deployment.

`yarn test`

### Test with coverage

This runs all the necessary commands to create a deployment.

`yarn test2`

### Deploy

This runs all the necessary commands to create a deployment.

`yarn deploy`

### Deploy Docker container

`docker-compose up -d --build && docker-compose logs -f`

## Dependencies

The following dependencies are installed along with the project.

- axios
- compression
- cors
- date-fns
- dotenv
- express
- express-validator
- helmet
- jsonwebtoken
- nanoid
- pg
- pg-hstore
- sequelize
- sequelize-cli
- express-rate-limit

## Dev dependencies

- @types/compression
- @types/cors
- @types/express
- @types/express-rate-limit
- @types/jsonwebtoken
- @types/sequelize
- eslint
- eslint-config-airbnb-typescript
- eslint-plugin-import
- typescript
