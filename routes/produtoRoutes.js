const express = require('express');
const produtoController = require('../controllers/produtoController');

const router = express.Router();

router.get('/cadastro-produto/:id_empresa', produtoController.cadastroPage);
router.post('/cadastrar', produtoController.cadastrarProduto);
router.get('/empresa/:id_empresa/produtos', produtoController.listarProdutosEmpresa);
router.get('/editar/:id_produto', produtoController.editarProdutoPage);
router.post('/editar/:id_produto', produtoController.editarProduto);
router.post('/deletar/:id_produto', produtoController.excluirProduto);

module.exports = router;