const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const movimentacaoModel = {
  create: async ({ id_funcionario, id_produto, tipo_movimentacao, quantidade }) => {
    return prisma.movimentacoes.create({
      data: {
        id_funcionario: parseInt(id_funcionario),
        id_produto: parseInt(id_produto),
        tipo_movimentacao,
        quantidade: parseInt(quantidade),
      },
    });
  },

  findByFuncionario: async (id_funcionario) => {
    return prisma.movimentacoes.findMany({
      where: { id_funcionario: parseInt(id_funcionario) },
      include: {
        produto: true,
        funcionario: true,
      },
      orderBy: { data_movimentacao: 'desc' },
    });
  },

  findByEmpresa: async (id_empresa) => {
    return prisma.movimentacoes.findMany({
      where: {
        funcionario: {
          id_empresa: parseInt(id_empresa),
        },
      },
      include: {
        produto: true,
        funcionario: true,
      },
      orderBy: { data_movimentacao: 'desc' },
    });
  },

  findById: async (id_movimentacao) => {
    return prisma.movimentacoes.findUnique({
      where: { id_movimentacao: parseInt(id_movimentacao) },
      include: {
        produto: true,
        funcionario: true,
      },
    });
  },

  update: async (id_movimentacao, { tipo_movimentacao, quantidade }) => {
    return prisma.movimentacoes.update({
      where: { id_movimentacao: parseInt(id_movimentacao) },
      data: {
        tipo_movimentacao,
        quantidade: parseInt(quantidade),
      },
    });
  },

  delete: async (id_movimentacao) => {
    return prisma.movimentacoes.delete({
      where: { id_movimentacao: parseInt(id_movimentacao) },
    });
  },
};

module.exports = movimentacaoModel;
