const { iniciarSesion } = require("../model/userMod");


module.exports = {
    async getToken(req, res){

        // console.log(req.headers.authorization.split(' ')[1]);

        let data = req.headers.authorization.split(' ')[1];
        let credenciales = Buffer.from(data, 'base64').toString('ascii').split(":");
        let existe = await iniciarSesion(credenciales[0],credenciales[1]);
        if (existe){
            console.log('1');
            res.send('existe usuario');
        }else{
            console.log('2');
            res.send('no existe usuario');
        }
    },
}