const { mergePdf } = require("../model/pdfMod");
const fs = require('fs');

module.exports = {
    async pdfTest(req, res){
        var msg = '';
        var pdfs = [];

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
    },
}