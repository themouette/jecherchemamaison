define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var Classified = Backbone.Model.extend({
        urlRoot: '/api/classifieds'
    });

    return Classified;
});
