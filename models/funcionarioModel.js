const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

const funcionarioModel = {
  create: async ({ nome_funcionario, cargo, email, senha, id_empresa }) => {
    const senhaCriptografada = await bcrypt.hash(senha, 10);
    return prisma.funcionario.create({
      data: {
        nome_funcionario,
        cargo,
        email,
        senha: senhaCriptografada,
        id_empresa: parseInt(id_empresa),
      },
    });
  },

  findById: async (id_funcionario) => {
    return prisma.funcionario.findUnique({
      where: { id_funcionario: parseInt(id_funcionario) },
    });
  },

  findByEmail: async (email) => {
    return prisma.funcionario.findUnique({ where: { email } });
  },

  findAllByEmpresa: async (id_empresa) => {
    return prisma.funcionario.findMany({
      where: { id_empresa: parseInt(id_empresa) },
    });
  },

  update: async (id_funcionario, { nome_funcionario, cargo, email, senha }) => {
    const updatedData = {};

    if (nome_funcionario) updatedData.nome_funcionario = nome_funcionario;
    if (cargo) updatedData.cargo = cargo;
    if (email) updatedData.email = email;
    if (senha) {
          updatedData.senha = await bcrypt.hash(senha, 10);
        }

    return prisma.funcionario.update({
      where: { id_funcionario: parseInt(id_funcionario) },
      data: updatedData,
    });
  },

  delete: async (id_funcionario) => {
    return prisma.funcionario.delete({
      where: { id_funcionario: parseInt(id_funcionario) },
    });
  },
};

module.exports = funcionarioModel;
