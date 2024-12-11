const express = require('express');
const funcionarioController = require('../controllers/funcionarioController');

const router = express.Router();

function autenticarFuncionario(req, res, next) {
    if (req.session.user && req.session.user.tipo === 'funcionario') {
      next();
    } else {
      res.redirect('/auth/login');
    }
  }

router.get('/cadastro-funcionario/:id_empresa', funcionarioController.cadastroPage);
router.post('/cadastro-funcionario', funcionarioController.cadastrarFuncionario);

router.get('/index/:id_funcionario', funcionarioController.funcionarioIndex);


module.exports = router;