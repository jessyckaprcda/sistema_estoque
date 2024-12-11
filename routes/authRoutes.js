const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/login', authController.loginPage);
router.post('/login', authController.login);

module.exports = router;
