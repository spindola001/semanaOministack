//importando o express
const express = require('express');

//função - criando um objeto especifico pra rotas
const routes = express.Router();

//importando o arquivo DevController
const DevController = require('./controllers/DevController');
//importando o arquivo DislikeController
const DislikeController = require('./controllers/DislikeController');
//importando o arquivo LikeController
const LikeController = require('./controllers/LikeController');

//GET, POST, PUT, DELETE
//Buscar, criar registro ou entidade, editar ou deletar informações em uma API

//modelo de função arrow function
//recebendo requisição e resposta
//o cliente faz uma requisição ao servidor, que retorna uma resposta
/*routes.get('/', (req, res) => {
    //retornando um texto como resposta
    //o query contem todos os parametros passados para a URL
    return res.json({message: `Olá ${req.query.name}!`});
});*/

//busca dentro da rota /devs as informações passadas para o método index, que no caso faz uma listagem de quais usuários ainda não receberam likes ou dislikes
routes.get('/devs', DevController.index);
//quando o navegador está acessando uma rota ele sempre envia um metodo get, nunca um post - apenas se houver um formulario em html
//criar um novo dev atraves do controller.js
routes.post('/devs', DevController.store);
routes.post('/devs/:devId/likes', LikeController.store);
routes.post('/devs/:devId/dislikes', DislikeController.store);


//exportando as rotas para o servidor
module.exports = routes;