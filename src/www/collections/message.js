define([
    'underscore',
    'backbone',
    'fossil/utils',
    'models/classified'
], function (_, Backbone, utils, Message) {
    var Messages = Backbone.Collection.extend({
        model: Message,
        idAttribute: '_id',
        initialize: function (options) {
            utils.copyOption(['classified'], this, options);
        },
        url: function () {
            if (!this.classified) {
                throw new Error('A related classified is required.');
            }
            return ['/api/classifieds', this.classified.id, 'messages'].join('/');
        }
    });

    return Messages;
});
