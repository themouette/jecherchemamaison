require([
    './application',
    'services/routing',
    'services/viewHandler',
    'services/window'
], function (Application, routing, template, window) {
    "use strict";

    if (!$('#jccm-application')) {
        return null;
    }

    var app = new Application();
    app
        .use('routing', routing)
        .use('template', template)
        .use('window', window)

        .start();
});
