// ## templates
//
// Use [grunt-contrib-handlebars](https://github.com/gruntjs/grunt-contrib-handlebars)
// under the hood, compiles templates for your project.
//
// ### Configuration
//
// * `config.www.templates`: where are raw templates stored
// * `config.public.templates`: where compiled tempaltes goes.
//
// ### Available tasks
//
// **templates:dev** compile templates continuously.
//
// **templates:release** compile templates.
//
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
                        "cwd": "<%= config.www.templates %>",
                        "src": "**/*.hbs",
                        "dest": "<%= config.public.templates %>",
                        "ext": ".js",
                        "expand": true
                    }
                ]
            }
        },
        "watch": {
            "templates": {
                "files": ["<%= config.www.templates %>/**/*.hbs"],
                "tasks": "handlebars:templates"
            }
        }
    });

    grunt.registerTask('templates:dev', 'compile templates continuously', ['handlebars:templates', 'watch:templates']);
    grunt.registerTask('templates:release', 'compile templates', ['handlebars:templates']);
};
