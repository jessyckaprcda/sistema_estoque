const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const funcionarioModel = require('../models/funcionarioModel');
const empresaModel = require('../models/empresaModel');

const prismaClient = new PrismaClient();

const authController = {
  loginPage: (req, res) => {
    res.render('login', { error: null });
  },

  login: async (req, res) => {
    try {
      const { email, senha } = req.body;

      // Verifica se o email pertence a uma empresa
      const empresa = await empresaModel.findByEmail(email); // Certifique-se que findByEmail existe
      if (empresa && (await bcrypt.compare(senha, empresa.senha))) {
        req.session.user = { id: empresa.id_empresa, tipo: 'empresa' };
        return res.redirect(`/index/${empresa.id_empresa}`);
      }

      // Verifica se o email pertence a um funcionário
      const funcionario = await funcionarioModel.findByEmail(email); // Certifique-se que findByEmail existe
      if (funcionario && (await bcrypt.compare(senha, funcionario.senha))) {
        req.session.user = { id: funcionario.id_funcionario, tipo: 'funcionario' };
        return res.redirect(`/funcionario/index/${funcionario.id_funcionario}`);
      }

      // Credenciais inválidas
      res.render('login', { error: 'Credenciais inválidas. Tente novamente.' });
    } catch (err) {
      console.error(err);
      res.render('login', { error: 'Erro no servidor. Tente novamente mais tarde.' });
    }
  },
};

module.exports = authController;
