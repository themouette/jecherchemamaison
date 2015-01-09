define([
    'react',
    'backbone',
    'jsx!react-components/classified/home',
    'templates/classified/home',
], function (React, Backbone, HomeComponent, classifiedHomeTpl) {
    var View = Backbone.View.extend({
        render: function() {
            React.render(
                React.createElement(HomeComponent, {classifieds: this.collection}, ''),
                this.$el[0]
            );
        }
    });

    return View;
});
