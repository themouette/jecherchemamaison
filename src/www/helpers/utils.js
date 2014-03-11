define([
    'underscore',
    'handlebars'
], function (_, Handlebars) {
    function safe(str) {
        return new Handlebars.SafeString(str);
    }

    function optionsFromArgs(args) {
        return _.last(args);
    }
    function helperArgs(args) {
        return  _.head(args, 1);
    }


    // The module to be exported
    var helpers = {

        // Add a css class to the view.
        viewClass: function () {
            var options = optionsFromArgs(arguments);
            var args = helperArgs(arguments);
            console.log(args);
            var classname = args.join(' ');

            if (options.data && options.data.view) {
                var $el = options.data.view.$el;
                $el.addClass(classname);
            }
        },
        number: function (num) {
            return Math.round(num * 100) / 100;
        },
        percent: function (percent) {
            return (Math.round(percent * 100 * 100) / 100) + " %";
        },

        currency: function (amount) {
            return (Math.round(amount * 100) / 100) + " €";
        },

        nl2br: function (str) {
            return str ? str.replace(/\n/mg, '<br />') : '';
        },
        encodeURIComponent: function(str) {
            return encodeURIComponent(str);
        },
        date: function (date) {
            if (!date) {return 'Inconnu';}
            var d = new Date(date);
            var options = {year: "numeric", month: "long", day: "numeric"};
            return d.toLocaleDateString('fr-FR', options);
        }
    };

    for (var helper in helpers) {
        Handlebars.registerHelper(helper, helpers[helper]);
    }

    return this;
});
