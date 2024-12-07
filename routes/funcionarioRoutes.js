const express = require('express');
const funcionarioController = require('../controllers/funcionarioController');

const router = express.Router();

router.get('/cadastro-funcionario/:id_empresa', funcionarioController.cadastroPage);
router.post('/cadastro-funcionario', funcionarioController.cadastrarFuncionario);
router.get('/login', (req, res) => res.render('login'));

router.get('/login/funcionario', funcionarioController.loginPage);
router.post('/login/funcionario', funcionarioController.login);
router.get('/index/:id_funcionario', funcionarioController.funcionarioIndex);


module.exports = router;