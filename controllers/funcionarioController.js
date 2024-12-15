const funcionarioModel = require('../models/funcionarioModel');
const empresaModel = require('../models/empresaModel'); // Certifique-se de que este modelo existe e está configurado

const funcionarioController = {
  // Página de cadastro de funcionário
  cadastroPage: (req, res) => {
    const { id_empresa } = req.params;
    res.render('cadastro-funcionario', { id_empresa });
  },

  // Cadastrar um novo funcionário
  cadastrarFuncionario: async (req, res) => {
    try {
      const funcionario = await funcionarioModel.create(req.body);
      res.redirect(`/funcionario/empresa/${funcionario.id_empresa}/funcionarios`);
    } catch (err) {
      res.status(500).send(`Erro ao cadastrar funcionário: ${err.message}`);
    }
  },

  // Página inicial do funcionário
  funcionarioIndex: async (req, res) => {
    try {
      const { id_funcionario } = req.params;
      const funcionario = await funcionarioModel.findById(id_funcionario);

      if (!funcionario) {
        return res.status(404).send('Funcionário não encontrado.');
      }

      const empresa = await empresaModel.findById(funcionario.id_empresa);

      if (!empresa) {
        return res.status(404).send('Empresa associada não encontrada.');
      }

      res.render('funcionarioIndex', { funcionario, empresa });
    } catch (err) {
      res.status(500).send(`Erro ao carregar a página do funcionário: ${err.message}`);
    }
  },

  // Listar funcionários de uma empresa
  listarFuncionarios: async (req, res) => {
    try {
      const { id_empresa } = req.params;
      const funcionarios = await funcionarioModel.findAllByEmpresa(id_empresa);
      const empresa = await empresaModel.findById(id_empresa);

      if (!empresa) {
        return res.status(404).send('Empresa não encontrada.');
      }

      res.render('listarFuncionario', { funcionarios, empresa });
    } catch (err) {
      res.status(500).send(`Erro ao listar funcionários: ${err.message}`);
    }
  },

  // Página de edição de funcionário
  editarFuncionarioPage: async (req, res) => {
    try {
      const { id_funcionario } = req.params;
      const funcionario = await funcionarioModel.findById(id_funcionario);

      if (!funcionario) {
        return res.status(404).send('Funcionário não encontrado.');
      }

      res.render('editarFuncionario', { funcionario });
    } catch (err) {
      res.status(500).send(`Erro ao carregar a página de edição: ${err.message}`);
    }
  },

  // Atualizar um funcionário
  atualizarFuncionario: async (req, res) => {
    try {
      const { id_funcionario } = req.params;
      const funcionario = await funcionarioModel.update(id_funcionario, req.body);

      if (!funcionario) {
        return res.status(404).send('Funcionário não encontrado para atualizar.');
      }

      res.redirect(`/funcionario/empresa/${funcionario.id_empresa}/funcionarios`);
    } catch (err) {
      res.status(500).send(`Erro ao atualizar funcionário: ${err.message}`);
    }
  },

  // Excluir um funcionário
  excluirFuncionario: async (req, res) => {
    try {
      const { id_funcionario } = req.params;
      const funcionario = await funcionarioModel.findById(id_funcionario);

      if (!funcionario) {
        return res.status(404).send('Funcionário não encontrado.');
      }

      await funcionarioModel.delete(id_funcionario);
      res.redirect(`/funcionario/empresa/${funcionario.id_empresa}/funcionarios`);
    } catch (err) {
      res.status(500).send(`Erro ao excluir funcionário: ${err.message}`);
    }
  },
};

module.exports = funcionarioController;
