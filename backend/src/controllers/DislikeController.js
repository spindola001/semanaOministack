const Dev = require('../models/Dev');

module.exports = {
    //salva a informação de um novo like
    async store(req, res){
        const { user } = req.headers;
        const { devId } = req.params;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if (!targetDev){
            return res.status(400).json({ error: "Dev not exists " });
        }

        loggedDev.dislikes.push(targetDev._id);

        await loggedDev.save();

        return res.json(loggedDev);
    }
};