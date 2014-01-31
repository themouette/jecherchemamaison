define([
    'underscore',
    'services/viewHandler',
    'services/routing',
    'handlebars'
], function (_, template, routing, Handlebars) {
    function safe(str) {
        return new Handlebars.SafeString(str);
    }

    Handlebars.registerHelper('url', urlFor);
    function urlFor(fragment) {
        var options = _.last(arguments);
        var fragments = _.initial(arguments, 1);

        var view = options.data.view;
        var module = options.data.module;

        var urlRoot = module.url || '';

        return "#" + urlRoot + fragments.join('');
    }

    var linkTpl = _.template('<a href="<%- url %>"<% for(var i in attrs) { %><%= i%>="<%= attrs[i] %>"<% } %>><%= title %></a>');

    Handlebars.registerHelper('linkTo', function (title, fragment) {
        var options = _.last(arguments);
        var fragments = _.rest(arguments, 1);

        var url = urlFor.apply(this, fragments);

        return safe(linkTpl({url: url, title: title, attrs: {}}));
    });

    Handlebars.registerHelper('linkToEvent', function (eventname) {
        var options = _.last(arguments);
        var id = options.hash.id || "fossil-link-to-event_"+_.uniqueId();

        var view = options.data.view;
        var module = options.data.module;

        view.once('on:plugins:attach', function () {
            view.$('#'+id).on('click', function (e) {
                e.preventDefault();
                module.trigger(eventname);
            });
            view.once('on:plugins:detach', function () {
                $('#'+id).off('click');
            });
        });

        return safe(linkTpl({url: module.url || '', attrs: {id: id}, title: options.fn()}));
    });
});
