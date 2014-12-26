// Compose assets fro the velocity template.
//
// The template is used for landing pages.
module.exports = function (grunt) {
    grunt.extendConfig({
        'less': {
            'options': {
                'paths': ['theme-velocity/less/default'],
                'sourceMap': true,
                'sourceMapFilename': '<%= config.public.css %>/velocity.css.map',
                'sourceMapURL': 'css/velocity.css.map'
            },
            'velocity': {
                'files': {
                    '<%= config.velocity.maincss %>': '<%= config.www.less %>/velocity.less'
                }
            }
        },
        'concat': {
            'velocity-css': {
                'src': [
                    '<%= config.velocity.dir %>/plugins/bootstrap/css/bootstrap.min.css',
                    '<%= config.velocity.dir %>/plugins/font-awesome/css/font-awesome.css',
                    '<%= config.velocity.dir %>/plugins/flexslider/flexslider.css',
                    //'<%= config.velocity.dir %>/css/styles.css',
                    '<%= config.velocity.maincss %>'],
                'dest': '<%= config.velocity.maincss %>'
            },
            'velocity-js': {
                'src': [
                    '<%= config.velocity.dir %>/plugins/jquery-1.11.1.min.js',
                    '<%= config.velocity.dir %>/plugins/jquery-migrate-1.2.1.min.js',
                    '<%= config.velocity.dir %>/plugins/bootstrap/js/bootstrap.min.js',
                    '<%= config.velocity.dir %>/plugins/bootstrap-hover-dropdown.min.js',
                    '<%= config.velocity.dir %>/plugins/back-to-top.js',
                    '<%= config.velocity.dir %>/plugins/jquery-placeholder/jquery.placeholder.js',
                    '<%= config.velocity.dir %>/plugins/FitVids/jquery.fitvids.js',
                    '<%= config.velocity.dir %>/plugins/flexslider/jquery.flexslider-min.js',
                    '<%= config.velocity.dir %>/js/main.js' ],
                'dest': '<%= config.velocity.mainjs %>'
            }
        },

        'watch': {
            'velocity-dev': {
                'files': [ '<%= config.www.less %>/**/*.less' ],
                'tasks': [ 'velocity:build:dev' ]
            }
        }
    });

    grunt.registerTask('velocity:dev', [
        'velocity:build:dev',
        'watch:velocity-dev'
    ]);
    grunt.registerTask('velocity:build:dev', [
        'less:velocity',
        'concat:velocity-css',
        'concat:velocity-js'
    ]);
    grunt.registerTask('velocity:release', [
        'less:velocity',
        'concat:velocity-css',
        'concat:velocity-js'
    ]);
};
