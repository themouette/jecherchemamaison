// This file should not be modified.
// =================================
//
// Look at doc/getting-started.md and doc/grunt-build.md for more information.
module.exports = function(grunt) {
    var path = require('path');
    var _ = require('lodash');

    // Project configuration.
    // Use pkg and grunt/config.json content.
    var options = {};
    _.extend(options, {
            pkg: grunt.file.readJSON('package.json')
        },
        readGruntOptions('grunt/config.json'));

    grunt.initConfig(options);

    // Add the extendConfig method to grunt.
    require('./grunt/plugin/extendConfig')(grunt);
    // load all npm tasks
    require('load-grunt-tasks')(grunt);
    // load all local grunt tasks
    grunt.loadTasks(path.resolve(__dirname, 'grunt', 'tasks'));

    // Main tasks.
    grunt.registerTask('build:release', 'Build release code.', ['templates:release', 'app:release', 'style:release']);

    grunt.registerTask('dev', 'Start development environment.', ['concurrent:dev']);

    grunt.registerTask('release', ['build:release']);
    grunt.registerTask('release:fix', 'Create a new fix release', ['build:release', 'bump:fix']);
    grunt.registerTask('release:minor', 'Create a new minor release', ['build:release', 'bump:minor']);
    grunt.registerTask('release:major', 'Create a new major release', ['build:release', 'bump:major']);

    grunt.registerTask('default', ['dev']);

    // This is a copy/paste from grunt/tasks/options.js, badly...
    // load a commented JSON file, strip comments
    // and returns parser JSON.
    function readGruntOptions(filename) {
        var commentRe = /^\s*\/\/.*\n/gm;
        if (!grunt.file.exists(filename)) {
            return {};
        }
        var content = grunt.file.read(filename);
        content = content.replace(commentRe, '');

        return JSON.parse(content);
    }
};
