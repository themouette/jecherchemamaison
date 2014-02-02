module.exports = function (grunt) {
    "use strict";

    grunt.extendConfig({
        "handlebars": {
            "options": {
                "namespace": false,
                "amd": true,
                "processPartialName": function(filePath) { // input:  templates/foo/_header.hbs
                    var pieces = filePath.split("/");
                    // remove "templates"
                    while("templates" !== pieces.shift()){}
                    // get filename
                    var filename = pieces.pop();
                    var nameRe = /^([^\.]*).|$/;
                    if (nameRe.test(filename)) {
                        filename = nameRe.exec(filename)[1];
                    }
                    pieces.push(filename);
                    return pieces.join('/'); // output: foo/_header
                }
            },
            "templates": {
                "files": [
                    {
                        "cwd": "<%= config.www.js %>/templates",
                        "src": "**/*.hbs",
                        "dest": "<%= config.public.js %>/templates",
                        "ext": ".js",
                        "expand": true
                    }
                ]
            }
        },
        "watch": {
            "templates": {
                "files": ["<%= config.www.js %>/templates/**/*.hbs"],
                "tasks": "handlebars:templates"
            }
        }
    });

    grunt.registerTask('templates:dev', 'compile templates continuously', ['handlebars:templates', 'watch:templates']);
    grunt.registerTask('templates:release', 'compile templates continuously', ['handlebars:templates']);
};
