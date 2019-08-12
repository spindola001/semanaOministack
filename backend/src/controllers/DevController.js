//importando pacote axios para requisitar APIs externas
const axios = require('axios');

//importando o diretorio Dev pra poder inserir os dado no banco
const Dev = require('../models/Dev');

//responsavel pela logica, por armazenar as infos no banco
//Criação, alteração, exclusão, e listagem de DEVs
module.exports = {
    //método pra listagem de registros dentro da tabela
    async index(req, res){
        //query para o banco de dados
        //buscando o usuário logado 
        const { user } = req.headers;

        //atraves do id obtenho as informações desse usuário
        const loggedDev = await Dev.findById(user);

        //filtrando a busca
        const users = await Dev.find({
            //todas essa "condições" devem ser atendidas
            $and: [
                //não pode listar o proprio user
                { _id: { $ne: user } },
                //não pode alguem em quem o dev já deu like
                { _id: { $nin: loggedDev.likes } },
                //ou dislike
                { _id: { $nin: loggedDev.dislikes } },
            ],
        })

        //retorna em json a funçao find
        return res.json(users);

    },
    //metodo para criação de uma entidade
    //async - usado para metodos asincronas (chegando na linha 15 o node vai aguardar a execução do comand)
    async store(req, res){

        //console.log(req.body.username);
        //usando desestruturação - passao a chave e depois o objeto
        //req.body traz as informações da rota que estão na api json
        const { username } = req.body;

        //o metodo findOne vai evitar que sejam inseridos dois usuários iguais
        const userExists = await Dev.findOne({ user: username });

        if (userExists){
            return res.json(userExists);
        }

        //buscando usuários do github atraves do axios
        //await - comando responsável por fazer aguardar a execução
        const response = await axios.get(`https://api.github.com/users/${username}`);

        //o axios faz uma requisição e retorna dentro do objeto data
        const { name, bio, avatar_url: avatar } = response.data;

        //as informaçõe aqui estão sendo buscadas do respose.data
        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar
        });

        //retorno da resposta da requisição do axios
        //console.log(response.data);
        return res.json(dev);
    }
}