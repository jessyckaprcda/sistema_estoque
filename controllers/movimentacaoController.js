const movimentacaoModel = require('../models/movimentacaoModel');
const funcionarioModel = require('../models/funcionarioModel');
const produtoModel = require('../models/produtoModel');

const movimentacaoController = {
  paginaMovimentacao: async (req, res) => {
    const { id_funcionario } = req.params;

    try {
      const funcionario = await funcionarioModel.findById(id_funcionario);

      if (!funcionario) {
        return res.status(404).send('Funcionário não encontrado.');
      }

      const produtos = await produtoModel.findAllByEmpresa(funcionario.id_empresa);
      res.render('movimentacao', { id_funcionario, produtos });
    } catch (err) {
      res.status(500).send(`Erro ao carregar a página de movimentação: ${err.message}`);
    }
  },

  registrarMovimentacao: async (req, res) => {
    try {
      const { id_funcionario, id_produto, tipo_movimentacao, quantidade } = req.body;

      const produto = await produtoModel.findById(id_produto);

      if (!produto) {
        return res.status(404).send('Produto não encontrado.');
      }

      const quantidadeAlterada = parseInt(quantidade);
      const novaQuantidade = tipo_movimentacao === 'entrada'
        ? produto.quantidade + quantidadeAlterada
        : produto.quantidade - quantidadeAlterada;

      if (novaQuantidade < 0) {
        return res.status(400).send('Quantidade insuficiente no estoque.');
      }

      await produtoModel.update(id_produto, { quantidade: novaQuantidade });

      await movimentacaoModel.create({
        id_funcionario,
        id_produto,
        tipo_movimentacao,
        quantidade: quantidadeAlterada,
      });

      res.redirect(`/funcionario/index/${id_funcionario}`);
    } catch (err) {
      res.status(500).send(`Erro ao registrar movimentação: ${err.message}`);
    }
  },

  listarMovimentacoesFuncionario: async (req, res) => {
    const { id_funcionario } = req.params;

    try {
      const movimentacoes = await movimentacaoModel.findByFuncionario(id_funcionario);
      res.render('listarMovimentacoes', { movimentacoes, isFuncionario: true });
    } catch (err) {
      res.status(500).send(`Erro ao listar movimentações: ${err.message}`);
    }
  },

  listarMovimentacoesEmpresa: async (req, res) => {
    const { id_empresa } = req.params;

    try {
      const movimentacoes = await movimentacaoModel.findByEmpresa(id_empresa);
      res.render('listarMovimentacoes', { movimentacoes });
    } catch (err) {
      res.status(500).send(`Erro ao listar movimentações: ${err.message}`);
    }
  },
};

module.exports = movimentacaoController;
