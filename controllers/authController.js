const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prismaClient = new PrismaClient();

const authController = {
    loginPage: (req, res) => {
      res.render('login', { error: null });
    },
  
    login: async (req, res) => {
      try {
        const { email, senha } = req.body;
  
        const empresa = await prismaClient.empresa.findUnique({ where: { email } });
        const funcionario = await prismaClient.funcionario.findUnique({ where: { email } });
  
        if (empresa && (await bcrypt.compare(senha, empresa.senha))) {
          req.session.user = { id: empresa.id_empresa, tipo: 'empresa' };
          return res.redirect(`/index/${empresa.id_empresa}`);
        } else if (funcionario && (await bcrypt.compare(senha, funcionario.senha))) {
          req.session.user = { id: funcionario.id_funcionario, tipo: 'funcionario' };
          return res.redirect(`/funcionario/index/${funcionario.id_funcionario}`);
        }
  
        res.render('login', { error: 'Credenciais inválidas. Tente novamente.' });
      } catch (err) {
        console.error(err);
        res.render('login', { error: 'Erro no servidor. Tente novamente mais tarde.' });
      }
    },
  
  };  

module.exports = authController;
