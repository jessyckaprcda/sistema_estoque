const { PrismaClient } = require('@prisma/client');
const prismaClient = new PrismaClient();
const bcrypt = require('bcrypt');

const empresaController = {
  homePage: (req, res) => {
    res.render('index');
  },

  cadastroPage: (req, res) => {
    res.render('cadastroEmpresa');
  },

  cadastrarEmpresa: async (req, res) => {
    try {
      const { nome_empresa, cnpj, endereco, telefone, email, senha} = req.body;
      const senhaCriptografada = await bcrypt.hash(senha, 10);

      const empresa = await prismaClient.empresa.create({
        data: { nome_empresa, cnpj, endereco, telefone, email, senha: senhaCriptografada},
      });
      res.redirect(`/index/${empresa.id_empresa}`);
    } catch (err) {
      res.status(500).send('Erro ao cadastrar empresa: ' + err.message);
    }
  },

  empresaIndex: async (req, res) => {
    try {
      const { id_empresa } = req.params;


      const empresa = await prismaClient.empresa.findUnique({
        where: { id_empresa: parseInt(id_empresa) },
      });

      if (!empresa) {
        return res.status(404).send('Empresa não encontrada.');
      }

      
      res.render('empresaIndex', { empresa });
    } catch (err) {
      res.status(500).send('Erro ao carregar a página da empresa: ' + err.message);
    }
  },
};

module.exports = empresaController;