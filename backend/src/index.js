//BASE DE UMA API CONSTRUIDA COM NODE.JS
//criando um servidor do express
//importando a biblioteca express
const express = require('express');
//importando a dependencia mongoose - para trabalhar com banco de dados usando a linguagem JS
const mongoose = require('mongoose');
//importando a função cors para que a minha aplicação seja acessada pelo react ou outros endereçõs
const cors = require('cors');
//importando um arquivo interno que controla as rotas
const routes = require('./routes');

//recebendo um servidor do express
const app = express();
//extrair o serv http de dentro do webS para unir ao serv WS
const server = require('http').Server(app);

//para que o servidor ouça o protocolo websockets
const io = require('socket.io')(server);

const connectedUsers = {};

io.on('connection', socket => {
    const { user } = socket.handshake.query;
    
    console.log(user, socket.id);

    connectedUsers[user] = socket.id;
});

//conexão co o banco de dados
mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-ij02m.mongodb.net/omnistack8?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

//passando a função cors para o servidor
app.use(cors());
//para q o express receba as informações em json
app.use(express.json());
//o app está usando as configurações e informações do arquivo routes
app.use(routes);

//porta que o servidor vai ouvir
server.listen(3333);



//arquit. MVC - model, view, controler
