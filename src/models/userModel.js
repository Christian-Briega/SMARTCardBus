// src/models/userModel.js
const db = require('../config/db');

// Mock anterior (mantido para a Home por enquanto)
exports.getUserData = () => {
    // return { nome: "Thiago", saldo: 42 };
};

// Nova função de segurança para salvar usuário no banco real
exports.cadastrarUsuario = async (nome, email, senhaCriptografada) => {
    // O uso de "?" garante proteção total contra SQL Injection
    const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
    const [resultado] = await db.execute(sql, [nome, email, senhaCriptografada]);
    return resultado;
};

// Função auxiliar para verificar se o e-mail já existe
exports.buscarPorEmail = async (email) => {
    const sql = 'SELECT * FROM usuarios WHERE email = ?';
    const [linhas] = await db.execute(sql, [email]);
    return linhas[0]; // Retorna o usuário encontrado ou undefined
};

exports.atualizarSaldo = async (usuarioId, quantidade) => {
    const sql = 'UPDATE usuarios SET saldo = saldo + ? WHERE id = ?';
    return await db.execute(sql, [quantidade, usuarioId]);
};

// src/models/userModel.js

// ... suas outras funções (buscarPorEmail, cadastrarUsuario) ...

// ADICIONE ESTA FUNÇÃO AQUI:
exports.buscarPorId = async (id) => {
    // Atenção: se a sua coluna de ID no banco se chamar "id_usuario", mude o "WHERE id" para "WHERE id_usuario"
    const sql = 'SELECT * FROM usuarios WHERE id = ?';
    const [linhas] = await db.execute(sql, [id]);
    return linhas[0];
};


