const fs = require('fs');

module.exports = {
    async fileToBase(file){        
        let base64 = null;

        const bitmap = file.buffer;
        base64 =  bitmap.toString('base64');

        return base64;
    },
    async baseToFile(file){

        const base64 = file.base64;
        const nombre = `${file.nombre}.${file.ext}`;

        let path = "./src/public/temp/"+nombre;

        fs.writeFileSync(path, base64, {encoding: 'base64'}, function(err) {
            console.log('File created');
        });

        return path;
    }

}