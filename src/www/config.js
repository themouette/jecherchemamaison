require.config({
    baseUrl: 'js/',
    paths: {
        'vendor': '<%= vendors %>',
        // jQuery defines itself as 'jquery', so you should
        // use this alias too.
        'jquery': '<%= vendors %>/jquery/jquery',
        'underscore': '<%= vendors %>/underscore/underscore',
        'backbone': '<%= vendors %>/backbone/backbone',
        'handlebars': '<%= vendors %>/handlebars/handlebars',
        'hbars': '<%= vendors %>/requirejs-handlebars/hbars',
        'fossil': '<%= vendors %>/fossil-core/src',
        'fossil/views': '<%= vendors %>/fossil-view/src'
    },
    map: {
        'hbars': {'Handlebars': 'handlebars'},
        '*': {'Handlebars': 'handlebars'}
    },
    shim: {
        'underscore': {exports: '_'},
        'backbone': {deps: ['underscore', 'jquery'], exports: 'Backbone'},
        'handlebars': {exports: 'Handlebars'}
    }
});
