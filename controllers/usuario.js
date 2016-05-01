'use strict';

var moment 	= require('moment');
var model 	= require('../models/UsuarioModel');
var uuid 	= require('uuid');
var jwt 	= require('jsonwebtoken');
var sha1 	= require('sha-1');
var md5 	= require('md5');

var UsuarioController = {};

// => Cadastra um novo usuário
UsuarioController.cadastrar = function(req, res, next) {
	
	var dadosUsuario 	= req.body;
	var timestamp 		= moment().format('YYYY-MM-DD HH:mm:ss');

	dadosUsuario.data_criacao = timestamp;
	dadosUsuario.data_atualizacao = timestamp;
	dadosUsuario.ultimo_login = timestamp;
	dadosUsuario._id = uuid.v4();
	dadosUsuario.senha = sha1(md5(dadosUsuario.senha));
	dadosUsuario.token = jwt.sign({ email: dadosUsuario.email, ult_login: timestamp }, 'cs-desafio-node', { expiresIn: 1800 });
	
	model.validaEmail(dadosUsuario.email, function(err, data) {
		if(!data) { 
		
			model.cadastrar(dadosUsuario, function(err, data) {
				
				var dadosRetorno = {
					id: data._id,
					data_criacao: data.data_criacao,
					data_atualizacao: data.data_atualizacao,
					ultimo_login: data.ultimo_login,
					ultimo_login: data.token
				 };
			});
			res.status(200).json(dadosUsuario);
			
		} else {
			res.status(200).json({mensagem:'E-mail já existente'});
		}
	});
}

// => Busca um usuario por id
UsuarioController.buscar = function(req, res) {
	var idUsuario 	= req.params;
	var token 		= req.headers.bearer;
	
	console.log('toke->', token);
	
	
	
	model.buscar(idUsuario, token, function(err, data) {
		
		//console.log('data===', data);
		
	});
	res.status(200).json({mensagem:'buscado'});
}

module.exports = UsuarioController;