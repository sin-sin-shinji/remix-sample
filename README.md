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

* Build

```
$ npm run build
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
