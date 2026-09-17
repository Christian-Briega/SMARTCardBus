const userModel = require('../models/userModel');
const db = require('../config/db');

exports.renderHome = (req, res) => {
    const usuarioLogado = req.session.user; 
    res.render('home', { 
        activeTab: 'home', 
        user: usuarioLogado || { nome: 'Passageiro' } 
    });
};

exports.renderHistory = async (req, res) => {
    const usuarioId = req.session.user ? req.session.user.id : 1;
    try {
        const [transacoes] = await db.execute(
            'SELECT * FROM transacoes WHERE usuario_id = ? ORDER BY criado_em DESC', 
            [usuarioId]
        );
        res.render('history', { activeTab: 'history', transacoes });
    } catch (error) {
        console.error(error);
        res.render('history', { activeTab: 'history', transacoes: [] });
    }
};

exports.renderInfo = (req, res) => {
    res.render('info', { activeTab: 'info' });
};


