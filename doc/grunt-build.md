Grunt build
===========

## Configuration

General configuration is located in `grunt/config.json` file.

This file defines the configuration object passed to `grunt.initConfig`.
All **global values**, including **`multiTasks` options**, are defined in this file.

All values are commented in the config file.

> It is ok to add inline comments in grunt JSON files with this build.

## Options

In `grunt/tasks/options.js` you will find a task loading all json files in the
`grunt/options/` directory.

Note that filename is used as key for your json configuration.

If you define `options` key, it will be merged to all local tasks, but will not
affect tasks outside of this file.

## Tasks

This should be built automatically by parsing `grunt/tasks/*.js` top comments.
