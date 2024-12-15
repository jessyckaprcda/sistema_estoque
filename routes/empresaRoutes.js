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
router.get('/empresa/perfil/:id_empresa', empresaController.listarEmpresas);
router.get('/index/:id_empresa', empresaController.empresaIndex);
router.get('/empresa/editar/:id_empresa', empresaController.editarEmpresaPage);
router.post('/empresa/editar/:id_empresa', empresaController.atualizarEmpresa);
router.post('/empresa/deletar/:id_empresa', empresaController.excluirEmpresa);

module.exports = router;