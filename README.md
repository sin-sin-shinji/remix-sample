# Remix Sample
## Requirement
* Docker or Node.js(v22.13.0)

## Setup for development
### Environmental variables

| Name | description|
|:---:|:---:|
| SESSION_SECRET | Secret string used to sign session information. Please set value from following command on terminal. `openssl rand -base64 32` |

### Using Docker
* docker-compose build

```
$ docker-compose build
```

* Install npm libraries

```
$ docker-compose run --rm app npm install
```

* DB Migration

```
$ docker-compose run --rm app npx prisma generate
```

* Start

```
$ docker-compose up -d
```

* Access to `http://localhost:3000`

### No Docker
* Install libraries

```
$ npm install
```

* DB Migration

```
$ npx prisma generate
```

* Start

```
$ npm start
```

* Access to `http://localhost:3000`

## Lint

* Lint

```
$ npm run lint
```

* Lint and fix codes

```
$ npm run lint:fix
```

## Database

* Generate migration file

```
$ npx prisma migrate dev --name init
```
