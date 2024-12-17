const express = require('express');
const funcionarioController = require('../controllers/funcionarioController');

const router = express.Router();

router.get('/cadastro-funcionario/:id_empresa', funcionarioController.cadastroPage);
router.post('/cadastro-funcionario', funcionarioController.cadastrarFuncionario);

router.get('/index/:id_funcionario', funcionarioController.funcionarioIndex);
router.get('/empresa/:id_empresa/funcionarios', funcionarioController.listarFuncionarios);
router.get('/editar/:id_funcionario', funcionarioController.editarFuncionarioPage);
router.post('/editar/:id_funcionario', funcionarioController.atualizarFuncionario);
router.post('/deletar/:id_funcionario', funcionarioController.excluirFuncionario);




module.exports = router;