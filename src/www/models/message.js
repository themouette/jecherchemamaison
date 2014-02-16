define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var Message = Backbone.Model.extend({
        idAttribute: '_id'
    });

    return Message;
});
