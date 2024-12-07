const express = require('express');
const movimentacaoController = require('../controllers/movimentacaoController');

const router = express.Router();

router.get('/:id_funcionario', movimentacaoController.paginaMovimentacao);
router.post('/registrar', movimentacaoController.registrarMovimentacao);
router.get('/funcionario/:id_funcionario/movimentacoes', movimentacaoController.listarMovimentacoesFuncionario);
router.get('/empresa/:id_empresa/movimentacoes', movimentacaoController.listarMovimentacoesEmpresa);

module.exports = router;