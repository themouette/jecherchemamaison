require.config({
    baseUrl: '/js/',
    deps: ['foundation'],
    paths: {
        'vendor': '<%= vendors %>',

        'text': '<%= vendors %>/requirejs-text/text',
        async: '<%= vendors %>/requirejs-plugins/src/async',
        font: '<%= vendors %>/requirejs-plugins/src/font',
        goog: '<%= vendors %>/requirejs-plugins/src/goog',
        image: '<%= vendors %>/requirejs-plugins/src/image',
        json: '<%= vendors %>/requirejs-plugins/src/json',
        noext: '<%= vendors %>/requirejs-plugins/src/noext',
        mdown: '<%= vendors %>/requirejs-plugins/src/mdown',
        jsx: '<%= vendors %>/jsx-requirejs-plugin/js/jsx',
        JSXTransformer: '<%= vendors %>/jsx-requirejs-plugin/js/JSXTransformer',
        propertyParser : '<%= vendors %>/requirejs-plugins/src/propertyParser',
        markdownConverter : '<%= vendors %>/requirejs-plugins/lib/Markdown.Converter',

        // jQuery defines itself as 'jquery', so you should
        // use this alias too.
        'jquery': '<%= vendors %>/jquery/dist/jquery',
        'modernizr': '<%= vendors %>/modernizr/modernizr',
        'underscore': '<%= vendors %>/underscore/underscore',
        'backbone': '<%= vendors %>/backbone/backbone',
        'handlebars': '<%= vendors %>/handlebars/handlebars',
        'fossil': '<%= vendors %>/fossil-core/src',
        'fossil/views': '<%= vendors %>/fossil-view/src',
        'foundation': '<%= vendors %>/foundation/js/foundation.min',
        'backbone.stickit': '<%= vendors %>/backbone.stickit/backbone.stickit',
        'maps': 'https://maps.googleapis.com/maps/api/js?sensor=false',

        'react': '<%= vendors %>/react/react',

        'fossil/views/model': 'views/model'
    },
    map: {
        '*': {}
    },
    jsx: {
        fileExtension: '.jsx'
    },
    shim: {
        'underscore': {exports: '_'},
        'backbone': {deps: ['underscore', 'jquery'], exports: 'Backbone'},
        'backbone.stickit': {deps: ['backbone'], exports: 'Backbone'},
        'handlebars': {exports: 'Handlebars'},
        'foundation': {
            deps: ['jquery', 'modernizr'],
            init: function (foundation) {
                $(document).foundation();
            }
        },
        'maps': { 'exports': 'google.maps' }
    },
    config: {
        'application': {
            foo: 'bar'
        }
    }
});
