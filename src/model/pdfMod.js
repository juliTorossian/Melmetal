const PDFDocument = require('pdf-lib').PDFDocument;
const fs = require('fs');

module.exports = {

    async mergePdf(pdfs){

        let msg = '';
    
        // console.log(pdf1Base64);
        // console.log(pdf2Base64);

        // let pdfBuffer1 = Buffer.from(pdf1Base64, "base64"); 
        // let pdfBuffer2 = Buffer.from(pdf2Base64, "base64");

        const expReg = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;

        let ok = true
        let pdfsToMerge = [];
        for (const pdf of pdfs){
            // console.log(expReg.test(pdf))
            if (expReg.test(pdf)){
                pdfsToMerge.push(Buffer.from(pdf, "base64"));
            }else{
                ok = false;
                msg = 'Un archivo no esta en base64.';
            }
        }

        if (ok){
            const mergedPdf = await PDFDocument.create(); 
            for (const pdfBytes of pdfsToMerge) { 
                const pdf = await PDFDocument.load(pdfBytes); 
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach((page) => {
                    mergedPdf.addPage(page); 
                }); 
            } 

            const buf = await mergedPdf.save();

            let path = './src/public/temp/merged.pdf'; 
            fs.open(path, 'w', function (err, fd) {
                fs.write(fd, buf, 0, buf.length, null, function (err) {
                    fs.close(fd, function () {
                        msg = 'wrote the file successfully';
                    }); 
                }); 
            });
        }

        return msg;
    },

}