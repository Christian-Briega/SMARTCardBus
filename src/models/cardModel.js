const db = require('../config/db');

exports.cadastrar = async (usuarioId, numeroCartao, tipo) => {
    const sql = 'INSERT INTO cartoes (usuario_id, numero_cartao, tipo) VALUES (?, ?, ?)';
    const [resultado] = await db.execute(sql, [usuarioId, numeroCartao, tipo]);
    return resultado;
};

exports.buscarPorUsuario = async (usuarioId) => {
    const sql = 'SELECT * FROM cartoes WHERE usuario_id = ?';
    const [linhas] = await db.execute(sql, [usuarioId]);
    return linhas;
};

exports.buscarPorIdentificador = async (identificador) => {
    const sql = 'SELECT * FROM cartoes WHERE id = ? OR numero_cartao = ?';
    const [linhas] = await db.execute(sql, [identificador, identificador]);
    return linhas[0];
};

exports.adicionarSaldo = async (cartaoId, quantidade) => {
    const sql = 'UPDATE cartoes SET saldo = saldo + ? WHERE id = ?';
    return await db.execute(sql, [quantidade, cartaoId]);
};


