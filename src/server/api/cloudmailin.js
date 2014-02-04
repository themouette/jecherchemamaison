var express = require('express');

var app = module.exports = express(),
    formidable = require('formidable');

app.post('/', function(req, res){
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    console.log(fields);
    res.writeHead(200, {'content-type': 'text/plain'});
    res.end('Message Received. Thanks!\r\n');
  });
});


