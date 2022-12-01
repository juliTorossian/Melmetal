const PDFDocument = require('pdf-lib').PDFDocument;
const fs = require('fs');
const FileAPI = require('file-api'), File = FileAPI.File, FileReader = FileAPI.FileReader;

const expReg = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
const path = './src/public/temp/merged.pdf';

function fileToBase64(filepath){
    return new Promise(resolve => {
        var file = new File(filepath);
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(event) {
            resolve(event.target.result);
        };
    });
};

module.exports = {

    async mergePdf(pdfs){

        let base64result = '';
        let ok = true
        let pdfsToMerge = [];

        // fs.unlinkSync(path);

        if (pdfs.length > 1){
            for (const pdf of pdfs){
                if (expReg.test(pdf) && pdf.length > 4){
                    pdfsToMerge.push(Buffer.from(pdf, "base64"));
                }else{
                    ok = false;
                }
            }
        }else{
            ok = false;
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

            fs.open(path, 'w', function (err, fd) {
                fs.write(fd, buf, 0, buf.length, null, function (err) {
                    fs.close(fd, function () {
                        msg = 'wrote the file successfully';
                    }); 
                }); 
            });

            base64result = await fileToBase64(path);
        }

        return base64result;
    },
    async addImgToPdf(pdf, images){
        const pathImg = './src/public/temp/pdfWithImages.pdf';
        let imagesBuff = [];
        let pdfBuff = [];

        const pdfOut = await PDFDocument.create();

        if (images.length > 1){

            if (pdf === null){
                // no existe pdf inicial

                for (const image of images){
                    const page = doc.addPage();
                    // Load the image and store it as a Node.js buffer in memory
                    let img = Buffer.from(image, "base64");
                    img = await doc.embedPng(img);

                    // Draw the image on the center of the page
                    const { width, height } = img.scale(1);
                    page.drawImage(img, {
                        x: page.getWidth() / 2 - width / 2,
                        y: page.getHeight() / 2 - height / 2
                    });
                }

            }else{
                // adjunto las imagenes a un pdf
                // for (const pdf of pdfs){
                //     if (expReg.test(pdf) && pdf.length > 4){
                //         pdfsToMerge.push(Buffer.from(pdf, "base64"));
                //     }else{
                //         ok = false;
                //     }
                // }
            }
            
            fs.writeFileSync(pathImg, await doc.save());

        }else{
            ok = false;
        }
        

        if (ok){
            
        }

    },

}