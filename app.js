const express = require('express');
const path = require('path');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const empresaRoutes = require('./routes/empresaRoutes');
const funcionarioRoutes = require('./routes/funcionarioRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const movimentacaoRoutes = require('./routes/movimentacaoRoutes');

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use(
  session({
    secret: 'pabd',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/auth', authRoutes);
app.use('/', empresaRoutes);
app.use('/funcionario', funcionarioRoutes);
app.use('/produto', produtoRoutes);
app.use('/movimentacao', movimentacaoRoutes);

app.use((req, res, next) => {
  res.status(404).send('Página não encontrada.');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
