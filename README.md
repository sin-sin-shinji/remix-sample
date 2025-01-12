# Remix Sample
## Requirement
* Docker or Node.js(v22.13.0)

## Using Docker
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

## No Docker
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
