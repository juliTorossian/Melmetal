const sharp = require("sharp");

module.exports = {
    async cambiarAGris(imagen){        
        const path = "./src/public/temp/img_gris.png";

        // console.log(path);
        // console.log(imagen.buffer)

        sharp(imagen.buffer)
        .grayscale()
        .toFile(path)
        .catch( err => { 
            console.log(err);
        });
        return path;
    }

}