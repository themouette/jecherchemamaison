module.exports = {
    name: 'Unknown',
    selector: null,
    extractData: function () {
        return {
            images: getImages(),
            price: getPrice()
        };

        // parse images
        function getImages() {
            var imgs = document.querySelectorAll('img');
            imgs = Array.prototype.slice.call(imgs);

            return imgs.map(function (elt) {
                var str = elt.getAttribute('src');
                return str;
            });
        }

        // extract price
        function getPrice() {
            return parseInt($('span.price').html().replace(/\s/g, ''));
        }
    }
};

