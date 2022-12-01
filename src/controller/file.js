const { fileToBase, baseToFile } = require("../model/fileMod");
const { tokenObsoleto } = require("../model/tokenMod");


module.exports = {
    async fileToBase(req, res){

        let token = req.headers.authorization.split(' ')[1];

        if (await tokenObsoleto(token)){
            // si esta obsoleto - no dejo continuar
            res.send("Token invalido");
        }else{
            
            const file = req.file

            console.log(file)

            let base64 = await fileToBase(file);

            // console.log(path)

            if (base64 != ''){
                // res.download(path);
                res.send(base64);
            }else{
                res.send("Error");
            }
        }
    },
    async baseToFile(req, res){

        let token = req.headers.authorization.split(' ')[1];

        if (await tokenObsoleto(token)){
            // si esta obsoleto - no dejo continuar
            res.send("Token invalido");
        }else{
            
            const base64 = req.body

            // console.log(req.body)

            let file = await baseToFile(base64);

            // console.log(path)

            if (file != ''){
                res.download(file);
                // res.send(file);
            }else{
                res.send("Error");
            }
        }
    },
}