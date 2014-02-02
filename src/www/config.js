require.config({
    baseUrl: 'js/',
    deps: ['foundation'],
    paths: {
        'vendor': '<%= vendors %>',
        // jQuery defines itself as 'jquery', so you should
        // use this alias too.
        'jquery': '<%= vendors %>/jquery/jquery',
        'underscore': '<%= vendors %>/underscore/underscore',
        'backbone': '<%= vendors %>/backbone/backbone',
        'handlebars': '<%= vendors %>/handlebars/handlebars',
        'text': '<%= vendors %>/requirejs-text/text',
        'fossil': '<%= vendors %>/fossil-core/src',
        'fossil/views': '<%= vendors %>/fossil-view/src',
        'foundation': '<%= vendors %>/foundation/js/foundation.min',

        'fossil/views/model': 'views/model'
    },
    map: {
        '*': {}
    },
    shim: {
        'underscore': {exports: '_'},
        'backbone': {deps: ['underscore', 'jquery'], exports: 'Backbone'},
        'handlebars': {exports: 'Handlebars'},
        'foundation': {
            deps: ['jquery'],
            init: function (foundation) {
                $(document).foundation();
            }
        }
    }
});
