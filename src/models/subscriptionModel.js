const db = require('../config/db');

// Cria um novo plano recorrente (semanal ou mensal)
exports.criarAssinatura = async (usuarioId, tipoPlano, valor, proximaRecarga) => {
    const sql = `
        INSERT INTO assinaturas (usuario_id, tipo_plano, valor, proxima_recarga)
        VALUES (?, ?, ?, ?)
    `;
    const [resultado] = await db.execute(sql, [usuarioId, tipoPlano, valor, proximaRecarga]);
    return resultado;
};

// Busca a assinatura ativa do usuário
exports.buscarAssinaturaAtiva = async (usuarioId) => {
    const sql = 'SELECT * FROM assinaturas WHERE usuario_id = ? AND status = "ativa"';
    const [linhas] = await db.execute(sql, [usuarioId]);
    return linhas[0];
};

// Cancela a assinatura atual
exports.cancelarAssinatura = async (assinaturaId) => {
    const sql = 'UPDATE assinaturas SET status = "cancelada" WHERE id = ?';
    const [resultado] = await db.execute(sql, [assinaturaId]);
    return resultado;
};


