// Simulando uma chamada ao banco de dados (Model)
const userModel = require('../models/userModel');

exports.renderHome = (req, res) => {
    // 1. Pega o usuário real direto da sessão (se ele fez login)
    const usuarioLogado = req.session.user; 

    // 2. Renderiza a tela mantendo a aba ativa e a proteção contra falhas
    res.render('home', { 
        activeTab: 'home', 
        user: usuarioLogado || { nome: 'Passageiro' } 
    });
};

exports.renderHistory = (req, res) => {
    res.render('history', { activeTab: 'history' });
};

exports.renderWallet = async (req, res) => {
    // ADICIONE ESTA LINHA DE TESTE AQUI:
    console.log("=== QUEM ESTÁ TENTANDO ENTRAR NA CARTEIRA? ===", req.session.user);

    if (!req.session.user) {
        console.log("-> Sessão vazia! Expulsando o usuário...");
        return res.redirect('/'); // Ou para onde estiver seu redirect
    }
    
    // ... resto do código do try/catch

    try {
        // 2. Busca os dados fresquinhos do banco de dados (saldo atualizado)
        const usuarioReal = await userModel.buscarPorId(req.session.user.id);

        // 3. Renderiza a tela passando os dados reais
        res.render('wallet', { 
            activeTab: 'wallet', 
            user: usuarioReal 
        });
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
};

exports.renderInfo = (req, res) => {
    res.render('info', { activeTab: 'info' });
};