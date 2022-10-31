const tokens = require("../json/token.json");
const fs = require('fs');

// offset para calcular cuando un token esta obsoleto
const timeOffset = 300000; // 5 minutos en milisegundos

function fechaObsoleta(fecha){
    let ahora = new Date();
    // console.log(ahora);
    // console.log(ahora.getTime() > (fecha.getTime() + timeOffset));
    return ahora.getTime() > (fecha.getTime() + timeOffset);
}
function guardarJson(){
    // fs.open(path, 'w', function (err, fd) {
    //     fs.write(fd, buf, 0, buf.length, null, function (err) {
    //         fs.close(fd, function () {
    //             msg = 'wrote the file successfully';
    //         }); 
    //     }); 
    // });

    let path = "../json/token.json";

    console.log(JSON.stringify(tokens));

    fs.writeFile(path, JSON.stringify(tokens), (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
          console.log("The written has the following contents:");
          console.log(fs.readFileSync(path, "utf8"));
        }
    });
}

module.exports = {
    tokenObsoleto(token){
        let aux = true;
        tokens.forEach(tkn => {
            if (tkn.token == token){
                let fecha = new Date(tkn.datetime);
                // console.log(fecha);
                if (!fechaObsoleta(fecha)){
                    tkn.obsolete = true;
                    aux = false;
                }
            }
        });
        // guardarJson();
        return aux;
    },
}

class Token{
    constructor(tokenUser, token, datetime, obsolete){
        this.user = tokenUser;
        this.token = token;
        this.datetime = new Date(datetime);
        this.obsolete = obsolete
    }
}