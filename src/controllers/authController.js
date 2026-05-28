// src/controllers/authController.js
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

// 1. Tela de Cadastro
exports.renderCadastro = (req, res) => {
    res.render('cadastro', { erro: null, sucesso: null });
};

// 2. Lógica de Cadastro
exports.processarCadastro = async (req, res) => {
    const { nome, email, senha, confirmarSenha } = req.body;

    if (!nome || !email || !senha || !confirmarSenha) {
        return res.render('cadastro', { erro: 'Todos os campos são obrigatórios.', sucesso: null });
    }

    if (senha !== confirmarSenha) {
        return res.render('cadastro', { erro: 'As senhas não coincidem.', sucesso: null });
    }

    try {
        const usuarioExistente = await userModel.buscarPorEmail(email);
        if (usuarioExistente) {
            return res.render('cadastro', { erro: 'Este e-mail já está em uso.', sucesso: null });
        }

        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(senha, salt);

        await userModel.cadastrarUsuario(nome, email, senhaHash);

        return res.render('cadastro', { erro: null, sucesso: 'Cadastro realizado com sucesso! Faça o login.' });
    } catch (error) {
        console.error(error);
        return res.render('cadastro', { erro: 'Erro interno no servidor. Tente novamente.', sucesso: null });
    }
};

// 3. Tela de Login
exports.renderLogin = (req, res) => {
    res.render('login', { erro: null, sucesso: null });
};

// 4. Lógica de Login
exports.processarLogin = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.render('login', { erro: 'Preencha todos os campos.', sucesso: null });
    }

    try {
        const usuario = await userModel.buscarPorEmail(email);
        if (!usuario) {
            return res.render('login', { erro: 'E-mail ou senha incorretos.', sucesso: null });
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
        if (!senhaCorreta) {
            // Corrigido de 'whitesucesso' para 'sucesso'
            return res.render('login', { erro: 'E-mail ou senha incorretos.', sucesso: null });
        }

        // ==========================================
        // NOVIDADE: Criando a sessão do usuário!
        // ==========================================
        req.session.user = {
            id: usuario.id, // ou id_usuario, dependendo do nome da sua coluna no banco
            nome: usuario.nome,
            email: usuario.email
        };

        // Agora sim, redireciona para a Home
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        return res.render('login', { erro: 'Erro ao tentar fazer login.', sucesso: null });
    }
};