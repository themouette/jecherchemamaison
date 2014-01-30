// ## Build the frontend javascript
//
// Just include '<%= config.public.mainjs %>' scrit in your html and your app
// is ready to be served.
//
// In **dev** mode, kernel is concatenated continuously with requirejs and
// configuration file so dependencies are lazy loaded.
//
// For **release**, files are combined and compressed to deliver a single file
// to your users.
module.exports = function (grunt) {
    "use strict";

    grunt.registerMultiTask('requirejs-config', 'Process requirejs config file and prepend it to dest', function () {
        var options = this.options({
            dest: "<%= config.public.mainjs %>",
            src: "<%= config.www.requireConfig %>"
        });
        var content;

        if (!grunt.file.exists(options.dest)) {
            content = "";
        } else {
            content = grunt.file.read(options.dest);
        }

        var src = grunt.file.read(options.src);
        src = grunt.template.process(src, {data: options});

        grunt.file.write(options.dest, [src, content].join(';'));
    });

    grunt.extendConfig({
        "clean": {
            "mainjs": ["<%= config.public.mainjs %>"]
        },
        // build requirejs config file using given options
        // as placehoders.
        "requirejs-config": {
            "options": {
                "dest": "<%= config.public.mainjs %>",
                "src": "<%= config.www.requireConfig %>"
            },
            "dev": {
                "options": {
                    "vendors": "<%= config.public.vendorsUrl %>"
                }
            },
            "release": {
                "options": {
                    "vendors": "../../<%= config.www.bower %>"
                }
            }
        },
        "requirejs": {
            "options": {
                "baseUrl": "<%= config.www.dir %>",
                // config file was copied to `config.public.mainjs`
                // before calling any require task, make sure configuration
                // is processed.
                "mainConfigFile": "<%= config.public.mainjs %>",
                "paths": {
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
                "src": [
                    "<%= config.www.bower %>/requirejs/require.js",
                    // config file was copied to `config.public.mainjs`
                    "<%= config.public.mainjs %>",
                    "<%= config.www.js %>/kernel.js" ],
                "dest": "<%= config.public.mainjs %>"
            },
            "app-kernel-release": {
                "src": [
                    "<%= config.www.bower %>/almond/almond.js",
                    "<%= config.public.mainjs %>" ],
                "dest": "<%= config.public.mainjs %>"
            }
        },
        "watch": {
            "app-dev": {
                "files": [ "<%= config.www.bower %>/requirejs/require.js", "<%= config.www.requireConfig %>", "<%= config.www.js %>/kernel.js" ],
                "tasks": ["app:dev:build"]
            }
        }
    });

    grunt.registerTask('app:dev:build', 'local build', [
        // clean "<%= config.public.mainjs %>" file.
        'clean:mainjs',
        // generate require config in "<%= config.public.mainjs %>" file.
        'requirejs-config:dev',
        // append kernel and prepend require.js
        'concat:app-kernel-dev',
    ]);

    grunt.registerTask('app:dev', 'build application for development environment', [
        'app:dev:build',
        // start watcher
        'watch:app-dev'
    ]);
    grunt.registerTask('app:release', 'build application for development environment', [
        // clean "<%= config.public.mainjs %>" file.
        'clean:mainjs',
        // replace placeholders in config file
        // and output result in "<%= config.public.mainjs %>"
        'requirejs-config:release',
        // Use "<%= config.public.mainjs %>" as config file
        // and build amd files in "<%= config.public.mainjs %>"
        'requirejs:main',
        // prepend config file to "<%= config.public.mainjs %>"
        'requirejs-config:release',
        // prepend almond
        'concat:app-kernel-release'
    ]);
};

