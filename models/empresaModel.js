const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prismaClient = new PrismaClient();

const empresaModel = {
  create: async ({ nome_empresa, cnpj, endereco, telefone, email, senha }) => {
    const senhaCriptografada = await bcrypt.hash(senha, 10);
    return await prismaClient.empresa.create({
      data: {
        nome_empresa,
        cnpj,
        endereco,
        telefone,
        email,
        senha: senhaCriptografada,
      },
    });
  },

  findById: async (id_empresa) => {
    return await prismaClient.empresa.findUnique({
      where: { id_empresa: parseInt(id_empresa) },
    });
  },

  findAll: async () => {
    return await prismaClient.empresa.findMany();
  },

  findByEmail: async (email) => {
    return prismaClient.empresa.findUnique({ where: { email } });
  },

  update: async (id_empresa, { nome_empresa, cnpj, endereco, telefone, email, senha }) => {
    const updatedData = {
      nome_empresa,
      cnpj,
      endereco,
      telefone,
      email,
    };

    if (senha) {
      updatedData.senha = await bcrypt.hash(senha, 10);
    }

    return await prismaClient.empresa.update({
      where: { id_empresa: parseInt(id_empresa) },
      data: updatedData,
    });
  },

  delete: async (id_empresa) => {
    return await prismaClient.empresa.delete({
      where: { id_empresa: parseInt(id_empresa) },
    });
  },
};

module.exports = empresaModel;
