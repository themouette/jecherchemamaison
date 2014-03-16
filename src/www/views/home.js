define([
    'templates/home',
    'underscore',
    'fossil/utils',
    'fossil/views/regionManager',
    'views/visit/list'
], function (tpl, _, utils, View, VisitListView) {

    var Home = View.extend({
        regions: {
            'visits': '.visit-region'
        },
        template: tpl,
        initialize: function (options) {
            utils.copyOption(['visits'], this, options);
            this.registerView(this.getVisitWidget(), 'visits');
        },
        getVisitWidget: function() {
            return new VisitListView({
                visits: this.visits
            });
        }
    });

    return Home;
});
