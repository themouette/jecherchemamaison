define([ 'services/engine', 'fossil/services/template' ], function (engine, Template) {
    "use strict";
    return new Template({
        engine: engine
    });
});
