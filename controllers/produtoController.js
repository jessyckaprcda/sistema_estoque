const produtoModel = require('../models/produtoModel');

const produtoController = {
  cadastroPage: (req, res) => {
    const { id_empresa } = req.params;
    res.render('cadastroProduto', { id_empresa });
  },

  cadastrarProduto: async (req, res) => {
    try {
      const produto = await produtoModel.create(req.body);
      res.redirect(`/produto/empresa/${produto.id_empresa}/produtos`);
    } catch (err) {
      console.error('Erro ao cadastrar produto:', err.message);
      res.status(500).send('Erro ao cadastrar o produto: ' + err.message);
    }
  },

  listarProdutosEmpresa: async (req, res) => {
    try {
      const { id_empresa } = req.params;
      const produtos = await produtoModel.findAllByEmpresa(id_empresa);
      res.render('listarProdutos', { produtos, empresa: {id_empresa} });
    } catch (err) {
      console.error('Erro ao listar produtos:', err.message);
      res.status(500).send('Erro ao listar os produtos: ' + err.message);
    }
  },

  editarProdutoPage: async (req, res) => {
    try {
        const { id_produto } = req.params;
        const produto = await produtoModel.findById(id_produto);

        if (!produto) {
            return res.status(404).send('Produto não encontrado.');
        }

        res.render('editarProduto', { produto });
    } catch (err) {
        res.status(500).send('Erro ao carregar a página de edição: ' + err.message);
    }
  },

  editarProduto: async (req, res) => {
    try {
      const { id_produto } = req.params;
      const produto = await produtoModel.update(id_produto, req.body);
      res.redirect(`/produto/empresa/${produto.id_empresa}/produtos`);
    } catch (err) {
      console.error('Erro ao atualizar produto:', err.message);
      res.status(500).send('Erro ao atualizar o produto: ' + err.message);
    }
  },

  excluirProduto: async (req, res) => {
    try {
      const { id_produto } = req.params;
      const produto = await produtoModel.findById(id_produto);

      if (!produto) {
        return res.status(404).send('Produto não encontrado.');
      }

      await produtoModel.delete(id_produto);
      res.redirect(`/produto/empresa/${produto.id_empresa}/produtos`);
    } catch (err) {
      console.error('Erro ao excluir produto:', err.message);
      res.status(500).send('Erro ao excluir o produto: ' + err.message);
    }
  },
};

module.exports = produtoController;
