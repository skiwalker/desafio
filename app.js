'use strict';

var express 	= require('express');
var bodyParser  = require('body-parser');
var app 		= express();

app.get('/', function(req, res) {
	res.status(200).json({mensagem:'Hello World'});
});


app.use(bodyParser.json());
app.use('/', require('./routes'));


app.listen(3000, function(){
	console.log('Server Rodando...');
});