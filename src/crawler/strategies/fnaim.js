var detectRe = /^https?:\/\/www.fnaim.fr/;

module.exports = {
    name: 'FNAIM',

    detect: function (url) {
        return detectRe.test(url);
    },

    extractData: function ($) {
        var data = {
            name: $('#contenu .desc p.bold').text(),
            price: parseInt($('#contenu .desc > h3').text().replace(/\s/g, ''), 10),
            images: $('#carousel img').map(function(index, elt) { return $(elt).attr('src'); }).get(),
            address: getAddress($),
            content: $('#contenu [itemprop="description"]').text().trim()
        };

        var extra = getExtra($);
        var otherDisplayed = [];
        for (var i = 0 ; i < extra.length ; i++) {
            var val = extra[i];
            switch(val.key) {
                case 'Type d\'habitation :':
                    data.type = val.value;
                    break;
                case 'Numéro d\'étage :':
                    data.etage = val.value;
                    break;
                case 'Surface habitable :':
                    data.surface = parseInt(val.value.replace(/\s/g, ''), 10);
                    break;
                default:
                otherDisplayed.push((val.key + ' ' + val.value).trim());
            }
        }

         if (otherDisplayed.length) {
            data.content += '\n\n* ' + otherDisplayed.join('\n* ');
        }

        return data;
    }
};

function getAddress($) {
    var address = $('#contenu [itemtype="http://schema.org/Residence"]');
    var town = address.find('div p').text();
    return town;
}

function getExtra($) {
    return $('#AGE_INFORMATIONS ul ul li')
        .map(function (index, elt) {
            var $elt = $(elt);
            var key = $(elt).find('label').text().trim();
            var value = $(elt).text().replace(key, '').trim();
            return {
                key: key,
                value: value
            };
        })
        .get();
}
