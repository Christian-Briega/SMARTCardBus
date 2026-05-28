const express = require('express');
const path = require('path');
const rotas = require('./routes/indexRoutes');
const session = require('express-session'); 

const app = express();

// Configurações do Express e EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));

// 2. ADICIONE A CONFIGURAÇÃO DE SESSÃO AQUI (Antes das rotas!)
app.use(session({
    secret: 'smartcard_super_secreto', // Chave de segurança (em produção vai pro .env)
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // false porque estamos usando HTTP local, não HTTPS
}));
// Usando as rotas
app.use('/', rotas);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});