const Dev = require('../models/Dev');

module.exports = {
    //salva a informação de um novo like
    async store(req, res){
        console.log(req.io, req.connected);
        //busca informações do usuário logado
        const { user } = req.headers;
        //aqui está o usuário que vai receber o like
        const { devId } = req.params;

        //busca as informações do usuário no banco de dados
        //instância do usuário pra poder acessar suas informações
        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        //verifica se o usuário que vai receber o like realmente existe
        if (!targetDev){
            //caso não exista: error 400
            return res.status(400).json({ error: "Dev not exists " });
        }

        //verifica se a ação do like foi reciproca
        if (targetDev.likes.includes(loggedDev._id)){
            const loggedSocket = req.connectedUsers[user];
            const targetSocket = req.connectedUsers[devId];

            if (loggedSocket) {
                req.io.to(loggedSocket).emit('match', targetDev);
            }

            if (targetSocket){
                req.io.to(targetSocket).emit('match', loggedDev);
            }
        }

        //push - adiciona uma nova informação dentro de um array
        loggedDev.likes.push(targetDev._id);

        //salva as informações no banco de dados
        await loggedDev.save();

        return res.json(loggedDev);
    }
};