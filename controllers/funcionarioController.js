const { PrismaClient } = require('@prisma/client');
const prismaClient = new PrismaClient();
const bcrypt = require('bcrypt');

const funcionarioController = {
  cadastroPage: (req, res) => {
    const { id_empresa } = req.params;
    res.render('cadastro-funcionario', { id_empresa });
  },

  cadastrarFuncionario: async (req, res) => {
    try {
      const { nome_funcionario, cargo, email, senha, id_empresa } = req.body;

      if (!id_empresa || isNaN(id_empresa)) {
        return res.status(400).send('ID da empresa é inválido.');
      }

      const senhaCriptografada = await bcrypt.hash(senha, 10);

      await prismaClient.funcionario.create({
        data: {
          nome_funcionario,
          cargo,
          email,
          senha: senhaCriptografada,
          id_empresa: parseInt(id_empresa),
        },
      });

      res.redirect(`/index/${id_empresa}`);
    } catch (err) {
      res.status(500).send('Erro ao cadastrar funcionário: ' + err.message);
    }
  },

  funcionarioIndex: async (req, res) => {
    try {
      const { id_funcionario } = req.params;
      const funcionario = await prismaClient.funcionario.findUnique({
        where: { id_funcionario: parseInt(id_funcionario) },
        include: { empresa: true },
      });

      if (!funcionario) {
        return res.status(404).send('Funcionário não encontrado.');
      }

      
      res.render('funcionarioIndex', { funcionario });
    } catch (err) {
      res.status(500).send('Erro ao carregar a página do funcionário: ' + err.message);
    }
  },
};

module.exports = funcionarioController;