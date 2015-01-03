#!/usr/bin/env node
var _           = require('lodash');
var VError      = require('verror');
var request     = require('request');
var encoding    = require('encoding');
var cheerio     = require('cheerio');
var debug       = require('debug')('jccm:crawler');

var strategies  = require('./strategies');

module.exports = crawl;

function crawl(url, next) {

    debug('attempt to crawl "%s"', url);

    // select strategy to apply
    var strategy = _.find(strategies, function (s) {
        return s.detect(url);
    });

    if (!strategy) {
        return next(new VError('No matching crawl strategy'));
    }

    debug('Strategy "%s" selected', strategy.name);

    if (strategy.normalizeUrl) {
        url = strategy.normalizeUrl(url);
        debug('Normalize url "%s"', url);
    }

    // crawl
    request.get({
        url: url,
        // Due to leboncoin encoding...
        // default null is ok.
        encoding: strategy.encoding
    }, function onScrapped(err, res) {
        try {
            var html = res.body;
            if (strategy.encoding) {
                html = encoding.convert(html, 'utf-8');
            }

            var $ = cheerio.load(html);

            var data = strategy.extractData($);

            next(null, data);

        } catch (e) {
            debug(e);
            next(new VError(e, 'while crawling ' + url));
        }
    });
}

if (!module.parent) {
    // Allow usage from command line
    //
    // DEBUG=* ./src/crawler/crawler.js "http://www.seloger.com/annonces/achat/appartement/clermont-ferrand-63/90939761.htm"
    var args = process.argv.slice(2);

    if (args.length < 1) {
        console.log('Please provide a URL to crawl.');
        return process.exit(1);
    }

    crawl(args[0], function (err, res) {
        if (err) {
            console.log('Following error occured:\n', err.stack);
            return process.exit(1);
        }

        console.log(res);
    });
}
