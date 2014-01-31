// This service handles main view attachement on browser window.
define([ 'fossil/services/canvas' ], function (Canvas) {
    "use strict";
    return new Canvas({
        selector: '#main'
    });
});
