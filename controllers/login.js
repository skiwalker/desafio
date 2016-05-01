var LoginController = {};

LoginController.login = function(req, res) {
	res.status(200).json({mensagem:'logado'});
}

module.exports = LoginController;