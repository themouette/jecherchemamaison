define([
    'templates/classified/show',
    'fossil/views/model'
], function (tpl, ModelView) {

    var Show = ModelView.extend({
        template: tpl
    });

    return Show;
});
