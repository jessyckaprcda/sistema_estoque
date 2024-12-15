const express = require('express');
const path = require('path');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const empresaRoutes = require('./routes/empresaRoutes');
const funcionarioRoutes = require('./routes/funcionarioRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const movimentacaoRoutes = require('./routes/movimentacaoRoutes');

const app = express();

// Middleware para processar JSON e dados de formulário
app.use(express.json()); // Necessário para interpretar o corpo da requisição em JSON
app.use(express.urlencoded({ extended: true })); // Necessário para interpretar dados de formulários (URL-encoded)

// Configuração de sessão
app.use(
  session({
    secret: 'pabd',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.static(path.join(__dirname, 'public')));


// Configuração do mecanismo de visualização EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rotas
app.use('/auth', authRoutes);
app.use('/', empresaRoutes);
app.use('/funcionario', funcionarioRoutes);
app.use('/produto', produtoRoutes);
app.use('/movimentacao', movimentacaoRoutes);

// Rota padrão para capturar acessos indevidos
app.use((req, res, next) => {
  res.status(404).send('Página não encontrada.');
});

// Inicialização do servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
