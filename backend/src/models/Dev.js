//Model - montagem de estrutura do banco de dados
//recurso do JS - desestruturação. Importando de dentro do mongoose
const { Schema,model } = require('mongoose');

//estrutura do do banco de dados que vai armazenar os dado do dev
const DevSchema = new Schema({

    name: {
        //tipo 
        type: String,
        //obrigatorio ou não - no caso é obrigatório
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    //por não ser obrigatoria o tipo já é passado direto
    bio: String,
    //armazena o endereco pra img no github
    avatar: {
        type: String,
        required: true,
    },
    //informações de likes e dislikes
    //esses vetores acessam pelo id do usuarios as informações de qual dev esse dev deu like ou dislike
    //o vetor permite uma quantidade ilimita likes
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev',
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev',
    }],

},{
    //CreatedAt - coluna altoumática criada em cada registro pra armazenar a data de criação de cada registro
    //UpdatedAt - tbm automática criada pra guardar a data da ultima alteração do registro
    timestamps: true,
});

//exportando o model - qualquer outro arquivo que importar esse model já vai poder interagir com a tabela
module.exports = model('Dev', DevSchema);

