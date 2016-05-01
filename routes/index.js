'use strict';

var express 			= require('express');
var router 				= express.Router();

var controllerUsuario 	= require('../controllers/usuario');
var controllerLogin 	= require('../controllers/login');

// => Criação de usuario
router.post('/cadastrar', controllerUsuario.cadastrar);

// => Busca de usuario
router.get('/:user_id', controllerUsuario.buscar);

// => Login
router.post('/login', controllerLogin.login);

module.exports = router;