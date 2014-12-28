module.exports = {
    // the strategy user friendly name
    name: 'Se loger',
    // selector for screenshot
    selector: '.main',

    // data extractor.
    // This must be standalone.
    extractData: function () {
        var data = {
            price: getPrice(),
            images: getImages(),
            name: getName(),
            content: getDescription(),
            type: getType()
        };

        var extra = getExtra();
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

        function getPrice() {
            var fullText = document
                .getElementById('price')
                .textContent
                .replace(/&nbsp;/g, '')
                .replace(/\n|\s/g, '')
                .trim();

            return /^(\d+)€/.exec(fullText)[1];
        }

        function getImages() {
            var nodes = document
                .querySelectorAll('img.carrousel-img');

            return Array.prototype.map.call(nodes, function (node) {
                return node
                    .getAttribute('src');
            });
        }
        function getName() {
            return document
                .querySelector('.detail-title')
                .childNodes[0]
                .textContent
                .replace(/^\s*\n/gm, '')
                .replace(/\n\s+/g, ' ')
                .trim();
        }

        function getDescription() {
            return document
                .querySelector('#detail .description')
                .innerHTML
                .replace(/^\s*\n/gm, '')
                .replace(/\n\s+/g, ' ')
                .trim();
        }

        function getType() {
            var fullText = document
                .querySelector('#detail .detail-subtitle')
                .childNodes[0]
                .textContent;

            return /Description de (.*)$/.exec(fullText)[1];
        }

        function getExtra() {
            var nodes = document
                .querySelectorAll('ol.description-liste li');

            return Array.prototype.map.call(nodes, function (node) {
                return node
                    .getAttribute('title');
            });
        }
    }
};
