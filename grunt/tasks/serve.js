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
        express: {
            dev: {
                options: {
                    port: port,
                    server: "<%= config.server.dev %>",
                    serverreload: true
                }
            },
            prod: {
                options: {
                    port: port,
                    server: "<%= config.server.prod %>",
                    base: "<%= config.public.dir %>"
                }
            }
        }
    });


    grunt.registerTask('serve:dev', 'Start a development server.', ['express:dev']);
    grunt.registerTask('serve:release', 'Start a production-like server FOR TESTING PURPOSE.', ['express:prod', 'express-keepalive:prod']);
};
