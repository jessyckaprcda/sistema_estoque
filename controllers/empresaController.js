const model = require('../models/empresaModel');

const empresaController = {
  homePage: (req, res) => {
    res.render('index');
  },

  cadastroPage: (req, res) => {
    res.render('cadastroEmpresa');
  },

  cadastrarEmpresa: async (req, res) => {
    try {
      const empresa = await model.create(req.body);
      res.redirect(`/index/${empresa.id_empresa}`);
    } catch (err) {
      res.status(500).send('Erro ao cadastrar empresa: ' + err.message);
    }
  },

  empresaIndex: async (req, res) => {
    try {
      const { id_empresa } = req.params;
      const empresa = await model.findById(id_empresa);

      if (!empresa) {
        return res.status(404).send('Empresa não encontrada.');
      }

      res.render('empresaIndex', { empresa });
    } catch (err) {
      res.status(500).send('Erro ao carregar a página da empresa: ' + err.message);
    }
  },

  listarEmpresas: async (req, res) => {
    try {
      const { id_empresa } = req.params;
      const empresa = await model.findById(id_empresa);

      if (!empresa) {
        return res.status(404).send('Empresa não encontrada.');
      }
      res.render('perfilEmpresa', { empresa });
    } catch (err) {
      res.status(500).send('Erro ao listar empresas: ' + err.message);
    }
  },

  editarEmpresaPage: async (req, res) => {
    try {
      const { id_empresa } = req.params;
      const empresa = await model.findById(id_empresa);

      if (!empresa) {
        return res.status(404).send('Empresa não encontrado.');
      }

      res.render('editarEmpresa', { empresa });
    } catch (err) {
      res.status(500).send(`Erro ao carregar a página de edição: ${err.message}`);
    }
  },

  // Atualizar um funcionário
  atualizarEmpresa: async (req, res) => {
    try {
      const { id_empresa } = req.params;
      const empresa = await model.update(id_empresa, req.body);

      if (!empresa) {
        return res.status(404).send('Funcionário não encontrado para atualizar.');
      }

      res.redirect(`/index/${empresa.id_empresa}`);
    } catch (err) {
      res.status(500).send(`Erro ao atualizar funcionário: ${err.message}`);
    }
  },

  excluirEmpresa: async (req, res) => {
    try {
      const { id_empresa } = req.params;
      await model.delete(id_empresa);
      res.redirect('/');
    } catch (err) {
      res.status(500).send('Erro ao excluir empresa: ' + err.message);
    }
  },
};

module.exports = empresaController;
