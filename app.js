const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const empresaRoutes = require('./routes/empresaRoutes');
const funcionarioRoutes = require('./routes/funcionarioRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const movimentacaoRoutes = require('./routes/movimentacaoRoutes');

const app = express();

app.use(
  session({
    secret: 'pabd',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', empresaRoutes);
app.use('/funcionario', funcionarioRoutes);
app.use('/produto', produtoRoutes);
app.use('/movimentacao', movimentacaoRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));