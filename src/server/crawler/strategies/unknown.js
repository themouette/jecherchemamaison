module.exports = {
    extractData: function () {
        return {
            images: getImagesUrl(),
            price: getPrice()
        };
    },
    name: 'Unknown',
    selector: null
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

