define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var Classified = Backbone.Collection.extend({
        url: '/api/classifieds'
    });

    return Classified;
});
