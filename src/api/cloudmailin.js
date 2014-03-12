var express = require('express');
var parser = require('../mailparser/parser');

var app = module.exports = express(),
    formidable = require('formidable');

app.post('/', function(req, res){
  console.log('new mail incoming');
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    if (err) return next(err);

    parser.parse(fields, files, function (err, message, relatedClassifieds) {
        if (err) return next(err);
        console.log('message: ', message);

        if (relatedClassifieds && relatedClassifieds.length) {
            // add message to classified
            console.log('Found related classifieds ', relatedClassifieds);
        } else {
            // create an orphan classified
            console.log('no related classified');
        }
        res.writeHead(200, {'content-type': 'text/plain'});
        res.end('Message Received. Thanks!\r\n');
    });
  });
});

