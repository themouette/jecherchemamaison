// This file defines the Model view.
// A Model view expose model data to template.
define(['fossil/views/view'], function (View) {
    "use strict";

    var ModelView = View.extend({
        getViewData: function () {
            if (this.model) {
                return this.model.toJSON();
            }
            return {};
        }
    });

    return ModelView;
});
