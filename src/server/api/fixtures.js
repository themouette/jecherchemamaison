var db = require('./db').classifieds;
var repository = require('./classifieds/repository');

insert({name: 'foo', _id: 0, price: 1000, img: null, desc:"Une annonce", surface: "82", stair: 4, address: '12 rue du pot'});
insert({name: 'foo', _id: 1, price: 3000, img: null, desc:"Une annonce", surface: "62", stair: 4, address: '12 rue du pot'});
insert({name: 'foo', _id: 2, price: 9000, img: null, desc:"Une annonce", surface: "74", stair: 4, address: '12 rue du pot'});
insert({name: 'foo', _id: 3, price: 5000, img: null, desc:"Une annonce", surface: "92", stair: 4, address: '12 rue du pot'});

function insert (doc) {
    return repository.insert(doc);
}

