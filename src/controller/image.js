const { cambiarAGris } = require("../model/imageMod");
const { tokenObsoleto } = require("../model/tokenMod");

module.exports = {
    async cambiarFormato(req, res){

        let token = req.headers.authorization.split(' ')[1];

        // console.log(token);
        // console.log(await tokenObsoleto(token));
        // veo si el token esta obsoleto
        if (await tokenObsoleto(token)){
            // si esta obsoleto - no dejo continuar
            res.send("Token invalido");
        }else{
            
            const imagen = req.file

            console.log(imagen)

            let path = await cambiarAGris(imagen);

            // console.log(path)

            if (path != ''){
                res.download(path, imagen.originalname);
                // res.download(path);
                // res.send(path);
            }else{
                res.send("Error");
            }
        }
    },
}