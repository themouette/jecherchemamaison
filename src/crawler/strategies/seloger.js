var detectRe = /^https?:\/\/www.seloger.com/;
var normalizeRe = /^([^\?]*)/;

function getPrice($) {
    var fullText = $('#price')
        .text()
        .replace(/&nbsp;/g, '')
        .replace(/\n|\s/g, '')
        .trim();

    return /^(\d+)€/.exec(fullText)[1];
}

function getImages($) {
    return $('img.carrousel-img')
        .map(function () {
            return $(this).attr('src');
        }).get();
}
function getName($) {
    return $('.detail-title')
        .text()
        .replace(/^\s*\n/gm, '')
        .replace(/\n\s+/g, ' ')
        .trim();
}

function getDescription($) {
    return $('#detail .description')
        .text()
        .replace(/^\s*\n/gm, '')
        .replace(/\n\s+/g, ' ')
        .trim();
}

function getType($) {
    var fullText = $('#detail .detail-subtitle')
        .text();

    return /Description de (.*)$/.exec(fullText)[1];
}

function getExtra($) {
    return $('ol.description-liste li')
        .map(function () {
            return $(this).attr('title');
        }).get();
}

module.exports = {
    // the strategy user friendly name
    name: 'Se loger',

    encoding: 'utf-8',

    detect: function (url) {
        return detectRe.test(url);
    },

    normalizeUrl: function (url) {
        return normalizeRe.exec(url)[1];
    },

    // data extractor.
    // This must be standalone.
    extractData: function ($) {
        var data = {
            price: getPrice($),
            images: getImages($),
            name: getName($),
            content: getDescription($),
            type: getType($)
        };

        var extra = getExtra($);
        var otherDisplayed = [];

        extra.forEach(function (val) {
            var surfaceRe = /(\s|\d*)\sm²/;
            if (surfaceRe.test(val)) {
                data.surface = surfaceRe.exec(val)[1].replace(/\s/g, '');
                return data;
            }
            var nbPiecesRe = /(\s|\d*)\sPièces?/;
            if (nbPiecesRe.test(val)) {
                data.nbPieces = nbPiecesRe.exec(val)[1].replace(/\s/g, '');
                return data;
            }
            otherDisplayed.push(val);
        });

         if (otherDisplayed.length) {
            data.content += '\n\n* ' + otherDisplayed.join('\n* ');
        }

        return data;

    }
};
