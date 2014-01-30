require.config({
    baseUrl: 'js/',
    paths: {
        'vendor': '<%= vendors %>',
        // jQuery defines itself as 'jquery', so you should
        // use this alias too.
        'jquery': '<%= vendors %>/jquery/jquery'
    },
    map: {
        '*': {
        }
    }
});
