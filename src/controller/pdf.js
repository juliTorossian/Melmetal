const { mergePdf } = require("../model/pdfMod");
const fs = require('fs');
const { tokenObsoleto } = require("../model/tokenMod");

module.exports = {
    async pdfTest(req, res){
        var msg = '';
        var pdfs = [];

        // console.log(req.headers.authorization.split(' ')[1]);

        let token = req.headers.authorization.split(' ')[1];

        // console.log(tokenObsoleto(token));
        // veo si el token esta obsoleto
        if (tokenObsoleto(token)){
            // si esta obsoleto - no dejo continuar
            res.send("Token invalido");
        }else{
            for (const pdf of req.body){
                console.log(pdf.name);
                // console.log(pdf.base64);
                pdfs.push(pdf.base64);
            }
    
            var base64Result = await mergePdf(pdfs);
            // console.log(base64Result);
    
            if (base64Result != ''){
                res.download("./src/public/temp/merged.pdf")
                // res.send(base64Result);
            }else{
                res.send("Error");
            }
        }
    },
}