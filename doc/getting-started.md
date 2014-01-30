Getting started with this template
==================================

## Grunt

This template loads all npm tasks automatically thanks to
[load-grunt-tasks](https://github.com/sindresorhus/load-grunt-tasks) plugin.

All js files in `grunt/tasks` folder are also loaded.

It provides a `grunt.extendConfig` method to define configuration in
separate files so you can split your `Gruntfile` easily.

The project comes with a set of built-in tasks and configurations to manage an
application using [requirejs](http://www.requirejs.org/),
[sass](http://sass-lang.com/) and optionally
[foundation](http://foundation.zurb.com).

Main commands are:

* **grunt dev --port=1337** : Start development environment;
* **grunt release** : build a release;
* **grunt release:fix** : build a release and bump a new fix version;
* **grunt release:minor** : build a release and bump a new minor version;
* **grunt release:major** : build a release and bump a new major version;
* **grunt serve:release** : serve latest release to simulate production.

## Sass

[sass](http://sass-lang.com/) files are located in `sass` directory and are
compiled to `public/css` directory.

[foundation](http://foundation.zurb.com) can be installed via
[bower](http://bower.io)

To add more libraries, look at `grunt/tasks/style.js`.

## Requirejs

All sources are located in `src/www/` folder. `src/www/kernel.js` is compiled
into `public/js/main.js`.

During development, `require.js`, `config` and `kernel` are simply concatenated,
while in release mode, there is only one file with `almond`, `config` and all
required files.

`src/www/config.js` is the [requirejs](http://www.requirejs.org/) main config
file. It is a **template** and it is possible to add more variables in
`grunt/tasks/app.js`.


