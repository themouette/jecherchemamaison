Recherche.immo
==============

[![wercker
status](https://app.wercker.com/status/2481d6204b915499405d66b319a433b5/m
"wercker
status")](https://app.wercker.com/project/bykey/2481d6204b915499405d66b319a433b5)

See [Getting started guide](doc/getting-statded.md) to learn how to customize
build.

## Set a proxy

On dokku:

``` bash
sudo -u dokku dokku config:get "jecherchemamaison" PROXY="88.176.44.98:28038"
```

On Production:

Use the local fig.production.yml

## Build the project

``` bash
fig run npm run release
fig run npm run dev
```

## Install

### Development

This project uses fig to run containers for devlopment purpose.

``` sh
git clone git@github.com:themouette/jecherchemamaison.git
cd jecherchemamaison
./bin/install
fig run npm run dev
```

### Production Server

To install a production server, you MUST have a set of deploy keys located in
your `~/.ssh/` directory. Those keys are named `recherche_immo_deploy_dsa` and
`recherche_immo_deploy_dsa.pub`.
You also MUST have ssh access to the production server, default server url is
`recherche.immo.prod`.

```
# This is a sample ./ssh/config
Host recherche.immo.prod
    User admin
    Port 22
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/id_rsa
    Hostname 95.142.173.163
```

Then simply run `./bin/build install:prod`

You can customize the remote `fig.production.yml` for custom behavior

## Run

### Development

Default run using `fig.yml` file.

``` sh
# To start in development mode
./bin/start

# DEVELOPMENT MACHINE ONLY
# to start in production conditions
IMMO_ENVIRONMENT=production ./bin/start

# To stop all containers
./bin/stop
```

### Production

For now, there is no graceful restart, we kill containers and recreate them.

``` sh
ssh recherche.immo.prod
cd ~/recherche.immo

# stop containers
fig -f fig.production.yml stop
# rm existing containers
fig -f fig.production.yml rm
# start fresh containers
fig -f fig.production.yml up -d app lb
```

## Publish

`./bin/build` is the publish toolbelt.

> For detailed informations, run `./bin/build --help`

``` sh
# Dokku
./bin/build stage

# Production
./bin/build production
```

To clean server containers, simply run `./bin/build clean:prod`

## License

This project is proprerty of Julien Muetton

