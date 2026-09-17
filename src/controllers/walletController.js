const userModel = require('../models/userModel');
const cardModel = require('../models/cardModel');
const db = require('../config/db');

exports.renderWallet = async (req, res) => {
    const userId = req.session.user ? req.session.user.id : 1;
    const user = await userModel.buscarPorId(userId);
    const cartoes = await cardModel.buscarPorUsuario(userId);

    res.render('wallet', { 
        user, 
        cartoes, 
        activeTab: 'wallet',
        erro: null,
        sucesso: null 
    });
};

exports.processarTransferencia = async (req, res) => {
    const remetenteId = req.session.user ? req.session.user.id : 1;
    const { emailDestinatario, quantidade } = req.body;
    const qtd = parseInt(quantidade);

    try {
        const remetente = await userModel.buscarPorId(remetenteId);
        if (!remetente || remetente.saldo < qtd || qtd <= 0) {
            return res.redirect('/wallet');
        }

        // Busca por e-mail (outra conta) ou por ID/Número de Cartão
        const usuarioDestino = await userModel.buscarPorEmail(emailDestinatario);
        const cartaoDestino = await cardModel.buscarPorIdentificador(emailDestinatario);

        if (usuarioDestino) {
            // Transferência Conta -> Conta
            await userModel.atualizarSaldo(remetenteId, -qtd);
            await userModel.atualizarSaldo(usuarioDestino.id, qtd);
        } else if (cartaoDestino) {
            // Transferência Conta -> Cartão
            await userModel.atualizarSaldo(remetenteId, -qtd);
            await cardModel.adicionarSaldo(cartaoDestino.id, qtd);
        } else {
            return res.redirect('/wallet');
        }

        return res.redirect('/wallet');
    } catch (error) {
        console.error(error);
        return res.redirect('/wallet');
    }
};

exports.renderCadastrarCartao = (req, res) => {
    res.render('cadastrar-cartao', { erro: null });
};

exports.processarCadastrarCartao = async (req, res) => {
    const usuarioId = req.session.user ? req.session.user.id : 1;
    const { numeroCartao, tipo } = req.body;

    try {
        await cardModel.cadastrar(usuarioId, numeroCartao, tipo);
        return res.redirect('/wallet');
    } catch (error) {
        return res.render('cadastrar-cartao', { erro: 'Cartão já cadastrado ou dados inválidos.' });
    }
};

