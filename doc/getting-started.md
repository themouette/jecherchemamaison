Getting started with this template
==================================

## Grunt configuration

This template loads all npm tasks automatically thanks to
[load-grunt-tasks](https://github.com/sindresorhus/load-grunt-tasks) plugin.

It provide a `grunt.extendConfig` method to define configuration in separate
files.

All js files in `grunt/tasks` folder are loaded by default, combining with
`grunt.extendConfig` you can split your `Grunfile` easily.

In `grunt/tasks/options.js` you will find a task loading all json files in the
`grunt/options/` directory.

> Note about options:
>
> When you extend grunt configuration, in case of multitasks, options are only
> applied locally.
