// ## Build the frontend javascript
//
//
//
module.exports = function (grunt) {
    "use strict";

    grunt.extendConfig({
        "requirejs": {
            "options": {
                "baseUrl": "<%= config.www.dir %>",
                "mainConfigFile": "<%= config.www.requireConfig %>",
                "paths": {
                    // override vendor directory
                    // to pick directly in bower repository
                    "vendor": "../../<%= config.www.bower %>",
                    "kernel": "kernel"
                }
            },
            "main": {
                "options": {
                    "out": "<%= config.public.mainjs %>",
                    "include": ['kernel']
                }
            }
        },
        "concat": {
            "app-kernel-dev": {
                "src": [ "<%= config.www.bower %>/requirejs/require.js", "<%= config.www.requireConfig %>", "<%= config.www.js %>/kernel.js" ],
                "dest": "<%= config.public.mainjs %>"
            },
            "app-kernel-release": {
                "src": [ "<%= config.www.bower %>/almond/almond.js", "<%= config.www.requireConfig %>", "<%= config.public.mainjs %>" ],
                "dest": "<%= config.public.mainjs %>"
            }
        },
        "watch": {
            "app-dev": {
                "files": [ "<%= config.www.bower %>/requirejs/require.js", "<%= config.www.requireConfig %>", "<%= config.www.js %>/kernel.js" ],
                "tasks": ["concat:app-kernel-dev"]
            }
        }
    });

    grunt.registerTask('app:dev', 'build application for development environment', ['concat:app-kernel-dev', 'watch:app-dev']);
    grunt.registerTask('app:release', 'build application for development environment', ['requirejs:main', 'concat:app-kernel-release']);
};

