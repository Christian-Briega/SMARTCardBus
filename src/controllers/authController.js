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

        // ATENÇÃO: Garanta que esta função existe no seu userModel.js com este mesmo nome
        if (typeof userModel.cadastrarUsuario === 'function') {
            await userModel.cadastrarUsuario(nome, email, senhaHash);
        } else if (typeof userModel.cadastrar === 'function') {
            await userModel.cadastrar(nome, email, senhaHash);
        } else {
            throw new Error('Função de cadastro não encontrada no userModel.js');
        }

        return res.render('cadastro', { erro: null, sucesso: 'Cadastro realizado com sucesso! Faça o login.' });
    } catch (error) {
        console.error("ERRO NO CADASTRO:", error);
        return res.render('cadastro', { erro: `Erro no servidor: ${error.message}`, sucesso: null });
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

        // Garante suporte tanto para a coluna 'senha' quanto 'senha_hash'
        const hashBanco = usuario.senha || usuario.senha_hash;
        if (!hashBanco) {
            throw new Error('Coluna de senha não encontrada no retorno do banco de dados.');
        }

        const senhaCorreta = await bcrypt.compare(senha, hashBanco);
        if (!senhaCorreta) {
            return res.render('login', { erro: 'E-mail ou senha incorretos.', sucesso: null });
        }

        req.session.user = {
            id: usuario.id || usuario.id_usuario,
            nome: usuario.nome,
            email: usuario.email
        };

        return res.redirect('/');
    } catch (error) {
        console.error("ERRO NO LOGIN:", error);
        return res.render('login', { erro: `Erro no login: ${error.message}`, sucesso: null });
    }
};
