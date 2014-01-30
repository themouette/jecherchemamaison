// ## Bump task
//
// This task creates a release.
//
// * **bump:fix** create a new fix release
// * **bump:minor** create a new minor release
// * **bump:major** create a new major release
module.exports = function (grunt) {
    "use strict";

    grunt.registerTask('bump:fix', 'Create a new fix version.', function () {
        bump();
    });
    grunt.registerTask('bump:minor', 'Create a new minor version.', function () {
        bump();
    });
    grunt.registerTask('bump:major', 'Create a new major version.', function () {
        bump();
    });

    function bump() {
        grunt.log.warn('Please, create a bump process.');
    }
};
