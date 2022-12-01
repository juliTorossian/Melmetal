const { iniciarSesion } = require("../model/userMod");
const { getToken, nuevoToken } = require("../model/tokenMod");


module.exports = {
    async getToken(req, res){

        // console.log(req.headers.authorization.split(' ')[1]);

        let data = req.headers.authorization.split(' ')[1];
        let credenciales = Buffer.from(data, 'base64').toString('ascii').split(":");
        let usuId = await iniciarSesion(credenciales[0],credenciales[1]);
        if (usuId != 0){
            // console.log('1');
            token = await getToken();
            // console.log(token);
            if (token === null){
                // console.log("busca nuevo token");
                token = await nuevoToken(usuId);

                // console.log("nuevo token " +token);
            }
            res.send(token);
        }else{
            // console.log('2');
            res.send('no existe usuario');
        }
    },
}