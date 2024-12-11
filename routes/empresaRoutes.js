const express = require('express');
const empresaController = require('../controllers/empresaController');

const router = express.Router();

function autenticarEmpresa(req, res, next) {
    if (req.session.user && req.session.user.tipo === 'empresa') {
      next();
    } else {
      res.redirect('/auth/login');
    }
  }

router.get('/', empresaController.homePage);
router.get('/cadastro', empresaController.cadastroPage);
router.post('/cadastro', empresaController.cadastrarEmpresa);

router.get('/index/:id_empresa', empresaController.empresaIndex);

module.exports = router;