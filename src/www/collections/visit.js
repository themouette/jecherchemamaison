define([
    'underscore',
    'backbone',
    'fossil/utils',
    'models/visit'
], function (_, Backbone, utils, Visit) {
    var Visits = Backbone.Collection.extend({
        model: Visit,
        idAttribute: '_id',
        initialize: function (options) {
            utils.copyOption(['classified'], this, options);
        },
        url: function () {
            if (!this.classified) {
                return '/api/visits';
            }
            return ['/api/classifieds', this.classified.id, 'visits'].join('/');
        }
    });

    return Visits;
});
