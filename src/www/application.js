define([
    'fossil/module',
    'fossil/views/view',
    'helpers/message',
    'helpers/routing'
], function (Module, View) {

    var Application = Module.extend({
        routes: {
            '': 'index',
            'classifieds': 'classifiedList',
            'classifieds/:id': 'classifiedShow',
            'compose': 'compose',
            'mail/:id': 'mailShow'
        },
        events: {
            "foo:bar": function () {
                console.log('foo:bar triggered.');
            }
        },

        index: function () {
            var view = new View({template: 'Hello {{@name}}'});
            this.useView(view, {}, {name: "Joe"});
        },


        classifiedList: function () {
            this.useView('{{message "List of classifieds:"}} {{linkTo "Annonce 12" "classifieds/12"}}');
        },

        classifiedShow: function (id) {
            this.useView('{{linkTo "Liste" "classifieds"}}<br />Annonce 12, {{linkTo "Nouveau message" "compose"}}');
        },

        compose: function () {
            this.useView('{{#linkToEvent "foo:bar" foo="bar"}}I do foo{{/linkToEvent}}<br />Annonce 12');
        },

        mailShow: function () {
        }

    });

    return Application;
});
