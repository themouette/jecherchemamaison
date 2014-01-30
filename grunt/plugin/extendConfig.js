module.exports = function(grunt) {

    var _ = require('lodash');

    var extendGruntConfig =
        grunt.extendConfig =
        grunt.config.extend = function extendGruntConfig(newConfig) {
        var config = grunt.config.data;
        _.forEach(newConfig, function (value, key) {
            if (isMultiTask(value)) {
                config[key] = handleMultiTask(value, config[key]);
                return ;
            }

            config[key] = handleSimpleTask(value, config[key]);
        });
    };

    function isMultiTask(config) {
        return typeof config === "object" && config.options;
    }

    function handleMultiTask(newConfig, config) {
        newConfig = _.cloneDeep(newConfig);
        if (newConfig.options) {
            // options are copied locally to make sure there is no side effect.
            _.forEach(newConfig, function (value, key) {
                if (key === "options") {
                    return ;
                }

                if (value.options) {
                    value.options = _.defaults(value.options, newConfig.options);
                } else {
                    value.options = newConfig.options;
                }
            });

            delete newConfig.options;
        }

        return handleSimpleTask(newConfig, config);
    }

    function handleSimpleTask(newConfig, config) {
        newConfig = _.cloneDeep(newConfig);
        config = _.cloneDeep(config);
        return _.defaults(newConfig, config || {});
    }

    return extendGruntConfig;
};
