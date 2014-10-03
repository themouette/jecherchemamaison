// ## server task
//
// Using grunt-contrib-express under the hood.
// It serves public directory by default.
//
// In **dev** mode it files under /js are served from respectively from
// 'public/js' and 'src/www'.
// Files under /vendors are served from respectively from 'bower_conmponents' and 'public/vendors'.
//
// In **prod**, only `public` directory is served, so you might need to copy
// static files during build.
//
// Here is an example copy task:
//
// ``` json
// {
//  "copy": {
//      "release-app": {
//      "files": {
//          "<%= config.public.vendors %>/jquery.js": "<%= config.www.vendors %>/jquery/jquery.js"
//      }
//  }
// }
// ```
//
// ### Available tasks
//
// **serve:dev** start dev server
//
// **serve:release** start prod server
//
module.exports = function (grunt) {
    "use strict";
    var port = grunt.option('port') || 1337;

    grunt.extendConfig({
        connect: {
            options: {
                port: port,
                hostname: '*'
            },
            dev: {
                options: {
                    debug: true,
                    middleware: function (connect) {
                        return [
                            // serve bower components if exists
                            vendorsDir(connect),
                            // Then compiled assets if exists
                            publicDir(connect),
                            // Then application
                            serverApp(connect, 'config.server.dev'),
                            // Finally, js www sources
                            jsSourcesDir(connect)
                        ];
                    }
                }
            },
            prod: {
                options: {
                    debug: false,
                    middleware: function (connect) {
                        return [
                            connect.logger(),
                            // Serve compiled assets if exists
                            publicDir(connect),
                            // Then application
                            serverApp(connect, 'config.server.prod'),
                        ];
                    }
                }
            }
        }
    });


    grunt.registerTask('serve:dev', 'Start a development server.', ['connect:dev:keepalive']);
    grunt.registerTask('serve:release', 'Start a production-like server FOR TESTING PURPOSE.', ['connect:prod:keepalive']);

    function publicDir(connect) {
        var server = connect.createServer();
        server.use(connect.static(grunt.config.get('config.public.dir')));
        return server;
    }

    function jsSourcesDir(connect) {
        var server = connect.createServer();
        server.use('/js', connect.static(grunt.config.get('config.www.js')));
        return server;
    }

    function vendorsDir(connect) {
        var server = connect.createServer();
        server.use(grunt.config.get('config.public.vendorsUrl'), connect.static(grunt.config.get('config.www.bower')));
        return server;
    }

    function serverApp(connect, main) {
        return require(grunt.config.get(main));
    }
};
