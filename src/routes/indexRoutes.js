const express = require('express');
const router = express.Router();

const pageController = require('../controllers/pageController');
const authController = require('../controllers/authController');
const walletController = require('../controllers/walletController');

// Home, Histórico e Informações
router.get('/', pageController.renderHome);
router.get('/historico', pageController.renderHistory);
router.get('/informacoes', pageController.renderInfo);

// Autenticação (Cadastro e Login)
router.get('/cadastro', authController.renderCadastro);
router.post('/cadastro', authController.processarCadastro);
router.get('/login', authController.renderLogin);
router.post('/login', authController.processarLogin);

// Carteira, Transferências e Cartões
router.get('/carteira', walletController.renderWallet);
router.get('/wallet', walletController.renderWallet);
router.post('/transferir', walletController.processarTransferencia);
router.get('/cartoes/novo', walletController.renderCadastrarCartao);
router.post('/cartoes/novo', walletController.processarCadastrarCartao);

module.exports = router;