module.exports = {
    // the strategy user friendly name
    name: 'Le bon coin',
    // selector for screenshot
    selector: '.content-border',

    // data extractor.
    // This must be standalone.
    extractData: function () {
        var data = {
            images: getImages(),
            price: getPrice(),
            content: getContent(),
            name: getName()
        };

        var extra = getExtra();
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
                    __utils__.echo("I can't handle "+val.key);
            }
        }
        return JSON.stringify(data);

        // parse images
        function getImages() {
            var imageRe = /url\('([^']*)'\)/;
            var imageAlterRe = /thumbs/g;
            var imgs = document.querySelectorAll('[style*=background-image]');
            imgs = Array.prototype.slice.call(imgs);

            return imgs.map(function (elt) {
                var str = elt.getAttribute('style');
                return imageRe
                    // extract backgound-image url
                    .exec(str)[1]
                    // replaces thumbs
                    .replace(imageAlterRe, 'images');
            });
        }

        // extract price
        function getPrice() {
            return convertToNumber($('span.price').html());
        }

        function getExtra() {
            return $('.lbcParams tr').map(function (index, row) {
                return { key: $('th', row).text().trim(), value: $('td', row).text().trim()};
            });
        }

        function getContent() {
            return $('.content').text().trim();
        }

        function getName() {
            return $('#ad_subject').text().trim();
        }

        function convertToNumber(str) {
            return parseInt(str.replace(/\s/g, ''), 10);
        }
    }
};


