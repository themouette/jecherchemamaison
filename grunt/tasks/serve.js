// ## server task
//
// Using grunt-contrib-connect under the hood. Following task is created:
//
// * app:dev:server
//
module.exports = function (grunt) {
    "use strict";
    var port = grunt.option('port') || 1337;

    grunt.extendConfig({
        connect: {
            dev: {
                options: {
                    port: port,
                    base: 'public'
                }
            }
        }
    });


    grunt.registerTask('app:dev:server', 'Start a development server.', ['connect:dev:keepalive']);
};
