const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const produtoModel = {
  create: async ({ nome_produto, categoria, quantidade, preco, id_empresa }) => {
    return prisma.produto.create({
      data: {
        nome_produto,
        categoria,
        quantidade: parseInt(quantidade),
        preco: parseFloat(preco),
        id_empresa: parseInt(id_empresa),
      },
    });
  },

  findAllByEmpresa: async (id_empresa) => {
    return prisma.produto.findMany({
      where: { id_empresa: parseInt(id_empresa) },
      orderBy: { nome_produto: 'asc' },
    });
  },

  findById: async (id_produto) => {
    return prisma.produto.findUnique({
      where: { id_produto: parseInt(id_produto) },
    });
  },

  update: async (id_produto, { nome_produto, categoria, quantidade, preco }) => {
    const updatedData = {};

    if (nome_produto) updatedData.nome_produto = nome_produto;
    if (categoria) updatedData.categoria = categoria;
    if (quantidade !== undefined) updatedData.quantidade = parseInt(quantidade);
    if (preco !== undefined) updatedData.preco = parseFloat(preco);

    return prisma.produto.update({
      where: { id_produto: parseInt(id_produto) },
      data: updatedData,
    });
  },

  delete: async (id_produto) => {
    return prisma.produto.delete({
      where: { id_produto: parseInt(id_produto) },
    });
  },
};

module.exports = produtoModel;
