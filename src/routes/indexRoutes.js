// src/routes/indexRoutes.js
const express = require('express');
const router = express.Router();

// Importação dos controladores
const pageController = require('../controllers/pageController');
// src/routes/indexRoutes.js
const authController = require('../controllers/authController');

// ADICIONE ESTA LINHA DE TESTE AQUI:
console.log("--- TESTE DE IMPORTAÇÃO SMARTCARD ---", authController);

// Linha 10 que está quebrando:
router.get('/cadastro', authController.renderCadastro);

// Rota Principal
router.get('/', pageController.renderHome);

// Rotas de Cadastro
router.get('/cadastro', authController.renderCadastro);
router.post('/cadastro', authController.processarCadastro);

// Rotas de Login
router.get('/login', authController.renderLogin);
router.post('/login', authController.processarLogin);

// Outras Rotas do Aplicativo
router.get('/historico', pageController.renderHistory);
router.get('/carteira', pageController.renderWallet);
router.get('/informacoes', pageController.renderInfo);

module.exports = router;