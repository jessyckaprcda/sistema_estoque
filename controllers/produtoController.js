const { PrismaClient } = require('@prisma/client');
const prismaClient = new PrismaClient();

const produtoController = {
    cadastroPage: (req, res) => {
        const { id_empresa } = req.params;
        res.render('cadastroProduto', { id_empresa });
      },      
      

      cadastrarProduto: async (req, res) => {
        try {
          const { nome_produto, categoria, quantidade, preco, id_empresa } = req.body;
      
          await prismaClient.produto.create({
            data: {
              nome_produto,
              categoria,
              quantidade: parseInt(quantidade),
              preco: parseFloat(preco),
              id_empresa: parseInt(id_empresa),
            },
          });
      
          res.redirect(`/index/${id_empresa}`);
        } catch (err) {
          console.error('Erro ao cadastrar produto:', err.message);
          res.status(500).send('Erro ao cadastrar o produto: ' + err.message);
        }
      },
};  


module.exports = produtoController;