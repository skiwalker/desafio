'use strict';

var md5 			= require('md5');
var sha1 			= require('sha-1');
var db 				= require('../config/database');
var UsuarioModel 	= {};

UsuarioModel.cadastrar = function(dataQuery, callback) {
  db.collection('usuarios').insert(dataQuery, function(err, data) {
	  if(err) {
		  callback(err, null);
	  }
	  callback(null, data.ops[0]);
  });
};

UsuarioModel.validaEmail = function(email, callback) {
  var query = { email: email };
  db.collection('usuarios').count(query, function(err, data) {
	  if(err) {
		callback(err);
	  }
	  callback(null, data);
  });
};

UsuarioModel.autentica = function(data, callback) {
  var q = { email: data.email, senha: sha1(md5(data.senha)) };
  db.collection('usuarios').findOne(q, callback);
};

UsuarioModel.atualizaToken = function(_id, data, callback) {
  var q = { _id: _id };
  db.collection('usuarios').update(q, { $set: data }, callback);
};

UsuarioModel.buscar = function(_id, token, callback) {
	  
  console.log('token:', token);
  console.log(typeof token);
  var query = { _id: _id.user_id, token:token };
  
  db.collection('usuarios').findOne(query, function(err, data) {
	  if(err) {
		callback(err);
	  }
	  console.log('models...', data);
	  callback(null, data);
  });
};

module.exports = UsuarioModel;