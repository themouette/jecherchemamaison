module.exports = function(grunt) {
    var path = require('path');
    var _ = require('lodash');

    var options = {};
    _.extend(options, {
            pkg: grunt.file.readJSON('package.json')
        },
        readGruntOptions('grunt/config.json'));


    // Project configuration.
    grunt.initConfig(options);

    // Add the extendConfig method to grunt.
    require('./grunt/plugin/extendConfig')(grunt);
    // load all npm tasks
    require('load-grunt-tasks')(grunt);
    // load all local grunt tasks
    grunt.loadTasks(path.resolve(__dirname, 'grunt', 'tasks'));
        console.log(grunt.config.data);

    // Default task(s).
    grunt.registerTask('build', []);
    grunt.registerTask('dev', ['build']);
    grunt.registerTask('default', ['build']);

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
