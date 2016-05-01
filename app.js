'use strict';

var express 	= require('express');
var bodyParser  = require('body-parser');
var app 		= express();

app.get('/', function(req, res) {
	res.status(200).json({mensagem:'Hello World'});
});


app.use(bodyParser.json());
app.use('/', require('./routes'));

app.use(function(req, res, next) {
  var err = new Error('Não encontrado');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 503);
  res.json({ mensagem: err.message });
  next();
});


app.listen(3000, function(){
	console.log('Server Rodando...');
});