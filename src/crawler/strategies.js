// Load all crawling strategies from strategies directory
var normalizedPath = require('path').join(__dirname, "strategies");
var strategies = {};

require("fs").readdirSync(normalizedPath).forEach(function(file) {
  var strategy = require("./strategies/" + file);
  strategies[strategy.name || file] = strategy;
});

module.exports = strategies;
