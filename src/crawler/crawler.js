// This file should be executed in nodejs context.
// It starts a casperjs browser and returns the parsed
// classified or an error.

var casper_args = [];

if (process.env.PROXY) {
    casper_args.push('--proxy='+process.env.PROXY);
}
if (process.env.DEBUG_CASPER) {
    casper_args.push('--verbose --log-level=debug');
}

var crawl = module.exports = function (url, next) {
    var exec = require('child_process').exec;
    var cmd = [
        'casperjs ',
        casper_args.join(' '), ' ',
        __dirname+'/casper.js ',
        url].join('');
        console.log('Execute: ', cmd);

    exec(cmd, function (error, stdout, stderr) {
        if (error) next(error);

        if (!classifiedRe.test(stdout)) {
            next(new Error('No classified found.'));
        }

        var classified;
        try {
            classified = classifiedRe.exec(stdout)[1];
            classified = JSON.parse(classified);
            next(null, classified);
        } catch (e) {
            next(e);
        }
    });

};

var classifiedRe = /^classified=(.*)$/m;
var errorRe = /^error=(.*)$/m;

function downloadImage(url, dest) {
    var request = require('superagent'),
        fs = require('fs');

    if (!dest) {
        throw new Exception('destination file is required');
    }

    var stream = fs.createReadStream(dest);
    var req = request.get(url);
    stream.pipe(req);
}

if (!module.parent) {
    crawl('http://www.leboncoin.fr/ventes_immobilieres/614586041.htm?ca=3_s', function (err, classified) {
        if (err) {
            console.log(err);
            return ;
        }

        console.log(classified);
    });
}
