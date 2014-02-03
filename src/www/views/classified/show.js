define([
    'jquery',
    'templates/classified/show',
    'fossil/views/model'
], function ($, tpl, ModelView) {

    var Show = ModelView.extend({
        template: tpl,

        events: {
            'click .classified-delete': 'deleteClassified'
        },
        initialize: function () {
            this
                .on('on:plugins:attach', function () {
                    this.$el.foundation();
                })
                .on('on:plugins:detach', function () {
                });
        },

        deleteClassified: function (e) {
            var v = this;
            e.preventDefault();
            if (!confirm("etes vous sur ?")) {
                return ;
            }
            this.model
                .destroy()
                .done(function () {
                    v.$el.prepend('<p class="alert info">Supprimé</p>');
                })
                .fail(function (err) {
                    alert(err);
                });
        }
    });

    return Show;
});
