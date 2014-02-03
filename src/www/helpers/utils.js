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
        }

    };

    for (var helper in helpers) {
        Handlebars.registerHelper(helper, helpers[helper]);
    }

    return this;
});
