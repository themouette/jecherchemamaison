grunt-init-themouette-frontend
==============================

See [Getting started guide](doc/getting-statded.md) to learn how to customize
build.

## Set a proxy

``` bash
sudo -u dokku dokku config:get "jecherchemamaison" PROXY="88.176.44.98:28038"
```

## Build the project

``` bash
fig run npm run release
fig run npm run dev
```

## Install

This project uses fig to run containers for devlopment purpose.

``` sh
git clone git@github.com:themouette/jecherchemamaison.git
cd jecherchemamaison
./bin/install
npm run dev
```

## Run

Default run using `fig.yml` file.

``` sh
# To start in development mode
./bin/start

# to start in production conditions
IMMO_ENVIRONMENT=production ./bin/start

# To stop all containers
./bin/stop
```

## License

This project is proprerty of Julien Muetton

