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
                    "out": "<%= config.public.main %>",
                    "include": ['kernel']
                }
            }
        },
        "concat": {
            "app-kernel": {
                "src": [ "<%= config.www.requireConfig %>", "<%= config.www.js %>/kernel.js" ],
                "dest": "<%= config.public.mainjs %>"
            }
        },
        "watch": {
            "app-dev": {
                "files": [ "<%= config.www.requireConfig %>", "<%= config.www.js %>/kernel.js" ],
                "tasks": ["concat:app-kernel"]
            }
        }
    });

    grunt.registerTask('app:dev', 'build application for development environment', ['concat:app-kernel', 'watch:app-dev']);
    grunt.registerTask('app:prod', 'build application for development environment', ['concat:app-kernel', 'requirejs:main']);
};

