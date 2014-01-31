define([ 'fossil/services/routing', ], function (Routing) {
    "use strict";
    return new Routing({
        history: {pushState: false},
        prefix: ""
    });
});
