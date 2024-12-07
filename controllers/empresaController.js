const { PrismaClient } = require('@prisma/client');
const prismaClient = new PrismaClient();

const empresaController = {
  homePage: (req, res) => {
    res.render('index');
  },

  cadastroPage: (req, res) => {
    res.render('cadastroEmpresa');
  },

  cadastrarEmpresa: async (req, res) => {
    try {
      const { nome_empresa, cnpj, endereco, telefone, email } = req.body;
      const empresa = await prismaClient.empresa.create({
        data: { nome_empresa, cnpj, endereco, telefone, email },
      });
      res.redirect(`/funcionario/cadastro-funcionario/${empresa.id_empresa}`);
    } catch (err) {
      res.status(500).send('Erro ao cadastrar empresa: ' + err.message);
    }
  },

  loginPage: (req, res) => {
    res.render('loginEmpresa');
  },

  login: async (req, res) => {
    try {
      const { email, cnpj } = req.body;

      const empresa = await prismaClient.empresa.findUnique({
        where: { email },
      });

      if (empresa && empresa.cnpj === cnpj) {
        req.session.empresa = {
          id: empresa.id_empresa,
          nome: empresa.nome_empresa,
        };
        res.redirect(`/index/${empresa.id_empresa}`);
      } else {
        res.render('login', { error: 'Credenciais inválidas.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro no servidor.');
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

  index: (req, res) => {
    const { id_empresa } = req.session; 
    res.render('empresaIndex', { id_empresa });
  },
};

module.exports = empresaController;