const { mergePdf } = require("../model/pdfMod");
const fs = require('fs');



module.exports = {
    pdfTest(req, res){
        var msg = '';
        var pdfs = [];

        pdfs.push(fs.readFileSync("./src/public/temp/!pdf1.txt", 'utf-8'));
        pdfs.push(fs.readFileSync("./src/public/temp/!pdf2.txt", 'utf-8'));
        // pdfs.push(fs.readFileSync("./src/public/temp/pdf2.txt", 'utf-8'));
        // var pdf1Base64 = fs.readFileSync("./src/public/temp/!pdf1.txt", 'utf-8');
        // var pdf2Base64 = fs.readFileSync("./src/public/temp/!pdf2.txt", 'utf-8');

        msg = mergePdf(pdfs);

        res.send(msg);

    },
}