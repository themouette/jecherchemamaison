// Define validator for visit objects.
var Promise = require('es6-promise').Promise;

module.exports.validate = function validate(classified, group) {
    return new Promise(function (resolve, reject) {
        resolve(classified);
    });
};

