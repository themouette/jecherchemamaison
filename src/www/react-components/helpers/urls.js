define(function(require, exports, module) {
    module.exports = {

        classifiedShow: function(classified) {
            return '#classifieds/' + classified._id;
        },

        classifiedEdit: function(classified) {
            return module.exports.classifiedShow(classified) + '/edit';
        }

    };
});
