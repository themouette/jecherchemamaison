define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var Visit = Backbone.Model.extend({
        idAttribute: '_id'
    });

    return Visit;
});
