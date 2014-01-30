// ## options task
//
// Load all json files in `directory` and extend configuration.
//
// ``` json
// "extend-config": {
//     "default": {files: ['grunt/options/*.json']}
// }
// ```
//
module.exports = function (grunt) {
    "use strict";
    var path = require('path');
    var _ = require('lodash');
    var defaults = {
        useFilenameAsKey: true
    };

    grunt.registerMultiTask('extend-config', 'Read all json files in a directory and extend config', function () {
        var options = this.options(defaults);

        this.files.forEach(function(file) {
            // load all files for this task
            loadJSONFileSet(file.src, options);
        });

    });

    loadPattern('grunt/options/*.json', defaults);

    // load config files from a pattern.
    function loadPattern(pattern, options) {
        var files = grunt.file.expand(pattern);
        loadJSONFileSet(files, options);
    }

    function loadJSONFileSet(files, options) {
        files.filter(function(filepath) {
            // Remove nonexistent files (it's up to you to filter or warn here).
            if (!grunt.file.exists(filepath)) {
                grunt.log.warn('Source file "' + filepath + '" not found.');
                return false;
            } else {
                return true;
            }
        }).map(_.partial(loadJSONFile, options));
        // Print a success message.
        grunt.log.ok('Configuration loaded.');
    }

    function loadJSONFile(options, filepath) {
        var useFilenameAsKey = options.useFilenameAsKey;

        // Read and return the file's source.
        var config = grunt.file.readJSON(filepath);

        // This means options are in `filename` namespace.
        // for instance `watch.json` will be used as `{watch: [content]}`
        if (useFilenameAsKey) {
            var tmp = config;
            config = {};
            config[key(filepath)] = tmp;
        }

        grunt.log.writeln('Load config from '+filepath);
        grunt.extendConfig(config);
    }

    function key(filepath) {
        return path.basename(filepath, path.extname(filepath));
    }

};
