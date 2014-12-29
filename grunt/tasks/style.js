// ## Style task
//
// Manage styles. By default sass files available in `<%= config.www.sass %>`
// are processed.
//
// * **style:dev** compiles stylesheets files and watch files for change.
// * **style:release** compiles stylesheets files and optimize for prodution.
module.exports = function (grunt) {
    "use strict";

    grunt.extendConfig({
        "sass": {
            "options": {
                "includePaths": [
                    // foundation
                    // If not already installed, just install through bower:
                    //
                    // `bower install --save foundation`
                    "<%= config.www.bower %>/foundation/scss/"
                ]
            },
            "all": {
                "files": [{
                    "expand": true,
                    "cwd": "<%= config.www.sass %>",
                    "src": "**/*.scss",
                    "dest": "<%= config.public.css %>",
                    "ext": ".css"
                }]
            }
        },
        "concat": {
            "sass-main": {
                "src": [
                    "<%= config.public.css %>/main.css",
                    "<%= config.cookiebar.css %>"],
                "dest": "<%= config.public.css %>/main.css"
            },
            "sass-landing": {
                "src": [
                    "<%= config.public.css %>/landing.css",
                    "<%= config.cookiebar.css %>"],
                "dest": "<%= config.public.css %>/landing.css"
            }
        },
        "cssmin": {
            "release": {
                "files": [{
                    "expand": true,
                    "cwd": "<%= config.public.css %>",
                    "src": "**/*.css",
                    "dest": "<%= config.public.css %>",
                    "ext": ".css"
                }]
            }
        },
        "copy": {
            "images": {
                "files": [
                    {
                        "expand": true,
                        "cwd": '<%= config.www.images %>',
                        "src": ['**'],
                        "dest": "<%= config.public.images %>/"
                    }
                ]
            }
        },
        "watch": {
            "sass": {
                "tasks": ["sass:all"],
                "files": ["<%= config.www.sass %>/**/*.scss"]
            }
        }
    });

    grunt.registerTask('style:build', ['sass:all', 'concat:sass-main', 'concat:sass-landing', "copy:images"]);
    grunt.registerTask('style:dev', 'Build stylesheets continuously.', ['style:build', 'watch:sass']);
    grunt.registerTask('style:release', 'Build stylesheets for release.', ['style:build', 'cssmin:release']);
};
