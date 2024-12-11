const express = require('express');
const produtoController = require('../controllers/produtoController');

const router = express.Router();

router.get('/cadastro-produto/:id_empresa', produtoController.cadastroPage);
router.post('/cadastrar', produtoController.cadastrarProduto);
router.get('/empresa/:id_empresa/produtos', produtoController.listarProdutosEmpresa);

module.exports = router;