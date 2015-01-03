var screenshotDir = "/app/data/screenshots";
var colorizer = require('colorizer').create('Colorizer');

var casper = require('casper').create({
    logLevel: "info",
    verbose: true,
    pageSettings: {
        javascriptEnabled: false,
        loadImages: false
    }
});

require("utils").dump(casper.cli.options);
require("utils").dump(casper.cli.args);

if (!casper.cli.args.length) {
    casper.warn("call me with an url parameter so I can fetch it.");
    casper.exit(1);
}

crawl(casper.cli.args[0]);


// import strategy depending on url.
function selectStrategy(url) {
    if (/^https?:\/\/www.leboncoin.fr/.test(url)) {
        return require('strategies/leboncoin');
    } else if(/^https?:\/\/www.seloger.com/.test(url)) {
        return require('strategies/seloger');
    } else {
        return require('strategies/unknown');
    }
}

function crawl(url) {

    // select strategy.
    var strategy = selectStrategy(url);
    casper.echo([
        'Slected strategy',
        colorizer.colorize(strategy.name, "INFO")
        ].join(' '));

    casper
        .start(url)
        .then(function () {
            // capture selector to keep a reference.
            this.captureSelector(screenshotDir+'/screen.png', strategy.selector || 'body');
        })
        .then(function () {
            var data = this.evaluate(function(extractor) {
                try {
                    return extractor();
                } catch (e) {
                    __utils__.echo(e);
                    return e.message || e;
                }
            }, strategy.extractData);

            if (!data) {
                return casper.exit(1);
            }

            casper.echo('classified='+JSON.stringify(data));
        })
        .then(function () {
            casper.exit(0);
        });
    casper.run();

    // tests/includes/pre.js
    casper.on('error', function on_error(failure, stack) {
        casper.echo(failure, 'ERROR');
        console.error(failure);

        if (stack) {
            console.log(stack);
        }
        casper.exit(1);
    });

    casper.on("page.error", function(msg, trace) {
        this.echo("Error: " + msg, "ERROR");
    });
}

