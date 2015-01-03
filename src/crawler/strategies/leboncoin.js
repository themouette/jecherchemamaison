var detectRe = /^https?:\/\/www.leboncoin.fr/;
var normalizeRe = /^([^\?]*)/;

// parse images
function getImages($) {
    var imageRe = /url\('([^']*)'\)/m;
    var imageAlterRe = /thumbs/g;
    // main image is also available in thumbs, so only thumbs are collected
    var imgs = $('[style*=background-image][style*=thumbs]');
    return Array.prototype.slice.call(imgs, 0)
        .map(function (elt) {
            var str = $(elt).attr('style');
            if (!imageRe.test(str)) return null;
            return imageRe
                // extract backgound-image url
                .exec(str)[1]
                // replaces thumbs
                .replace(imageAlterRe, 'images');
        }).filter(function identity(a) {return a;});
}

// extract price
function getPrice($) {
    return convertToNumber($('span.price').html());
}

function getExtra($) {
    return $('.lbcParams tr').map(function (index, row) {
        return { key: $('th', row).text().trim(), value: $('td', row).text().trim()};
    });
}

function getContent($) {
    return $('.content').text().trim();
}

function getName($) {
    return $('#ad_subject').text().trim();
}

function convertToNumber(str) {
    return parseInt(str.replace(/\s/g, ''), 10);
}

module.exports = {
    // the strategy user friendly name
    name: 'Le bon coin',

    encoding: 'binary',

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
            images: getImages($),
            price: getPrice($),
            content: getContent($),
            name: getName($)
        };

        var extra = getExtra($);
        for (var i = 0 ; i < extra.length ; i++) {
            var val = extra[i];
            switch(val.key) {
                case "Ville :":
                    data.town = val.value;
                    break;
                case "Code postal :":
                    data.zipcode = val.value;
                    break;
                case "Type de bien :":
                    data.type = val.value;
                    break;
                case "Pièces :":
                    data.nbPieces = convertToNumber(val.value);
                    break;
                case "Surface :":
                    data.surface = convertToNumber(val.value);
                    break;
                case "Référence :":
                    data.reference = val.value;
                    break;
                default:
                    console.log("I can't handle "+val.key);
            }
        }
        return data;

    }
};


