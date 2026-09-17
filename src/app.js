require('dotenv').config(); // DEVE ser a primeira linha do projeto
const express = require('express');
const path = require('path');
const session = require('express-session'); 
const rotas = require('./routes/indexRoutes');

const app = express();

// Configurações do EJS e Middlewares para requisições
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Configuração de Sessão usando chave do .env
app.use(session({
    secret: process.env.SESSION_SECRET || 'smartcard_super_secreto',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// Rotas da aplicação
app.use('/', rotas);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});