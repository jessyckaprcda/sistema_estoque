const { PrismaClient } = require('@prisma/client');
const prismaClient = new PrismaClient();

const movimentacaoController = {
  paginaMovimentacao: async (req, res) => {
    const { id_funcionario } = req.params;

    try {
      const funcionario = await prismaClient.funcionario.findUnique({
        where: { id_funcionario: parseInt(id_funcionario) },
        include: { empresa: true },
      });

      if (!funcionario) {
        return res.status(404).send("Funcionário não encontrado.");
      }

      const produtos = await prismaClient.produto.findMany({
        where: { id_empresa: funcionario.id_empresa },
      });

      res.render('movimentacao', { id_funcionario, produtos });
    } catch (err) {
      console.error('Erro ao carregar a página de movimentação:', err.message);
      res.status(500).send('Erro ao carregar a página de movimentação.');
    }
  },

  registrarMovimentacao: async (req, res) => {
    try {
      const { id_funcionario, id_produto, descricao, valor, tipo_movimentacao, quantidade } = req.body;

      const produto = await prismaClient.produto.findUnique({
        where: {
          id_produto: parseInt(id_produto),
        },
      });

      if (!produto) {
        return res.status(404).send('Produto não encontrado');
      }

      const quantidadeAlterada = parseInt(quantidade);

      let novaQuantidade =
        tipo_movimentacao === 'entrada'
        ? produto.quantidade + quantidadeAlterada
        : produto.quantidade - quantidadeAlterada;

      if (novaQuantidade < 0){
        return res.status(400).send('Quantidade insuficiente no estoque.');
      }

      await prismaClient.produto.update({
        where: {
          id_produto: parseInt(id_produto),
        },
        data: {
          quantidade: novaQuantidade,
        },
      });
      
      await prismaClient.movimentacoes.create({
        data: {
          id_funcionario: parseInt(id_funcionario, 10),
          id_produto: parseInt(id_produto, 10),
          descricao,
          valor,
          tipo_movimentacao,
          quantidade: quantidadeAlterada,
        },
      });

      res.redirect(`/funcionario/index/${id_funcionario}`);

    } catch (error) {
      console.error('Erro ao registrar movimentação:', err.message);
      res.status(500).send('Erro ao carregar as movimentações.');
    }
  },
  listarMovimentacoesFuncionario: async (req, res) => {
    const { id_funcionario } = req.params;
    const funcionarioId = parseInt(id_funcionario);

    try {
        const movimentacoes = await prismaClient.movimentacoes.findMany({
            where: {
                id_funcionario: funcionarioId
            },
            include: {
              produto: true
            }
        });
        res.render('listarMovimentacoes', { movimentacoes, isFuncionario: true });
    } catch (error) {
        console.error('Erro ao listar movimentações:', error);
        res.status(500).send('Erro interno do servidor');
    }
},
listarMovimentacoesEmpresa: async (req, res) => {
  const { id_empresa } = req.params;
  const idEmpresaInt = parseInt(id_empresa);

  const movimentacoes = await prismaClient.movimentacoes.findMany({
      where: {
          funcionario: {
              id_empresa: idEmpresaInt
          }
        },
          include: {
            produto: true
          }
        });
  res.render('listarMovimentacoes', { movimentacoes });
}
};

module.exports = movimentacaoController;