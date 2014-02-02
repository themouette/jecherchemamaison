define([
    'templates/classified/create',
    'underscore',
    'fossil/views/model',
    'models/classified',
    'templates/classified/_form'
], function (tpl, _, View, Classified) {

    var Create = View.extend({
        events: {
            'submit form': 'onSubmit'
        },
        template: tpl,

        onSubmit: function (e) {
            e.preventDefault();
            if (!this.model) {
                this.createModel();
            }
            var values = this.$(e.target).serializeArray();
            values = _.reduce(values, function (accumulator, val) {
                accumulator[val.name] = val.value;
                return accumulator;
            }, {});

            this.model.set(values).save();
        },

        createModel: function () {
            return new Classified();
        }
    });

    return Create;
});
