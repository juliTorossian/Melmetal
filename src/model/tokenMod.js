const { query } = require("../helpers/querys");

// offset para calcular cuando un token esta obsoleto
// const timeOffset = 300000; // 5 minutos en milisegundos

async function fechaObsoleta(fecha){
    const timeOffset = await getTimeOffset();
    let ahora = new Date();
    // console.log("token (ms) :" +fecha.getTime());
    // console.log("token + offset (ms) :" +(fecha.getTime() + timeOffset));
    // console.log("momento (ms) :" +ahora.getTime());
    // console.log(ahora.getTime() > (fecha.getTime() + timeOffset));
    // console.log((ahora.getTime() - fecha.getTime()) < timeOffset);
    return ahora.getTime() > (fecha.getTime() + timeOffset);
}

function generarNuevoToken(largo){
    const caracteresPosibles ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&/*+-';
    let tokenGenerado = '';
    const caracteresPosiblesLargo = caracteresPosibles.length;
    for ( let i = 0; i < largo; i++ ) {
        tokenGenerado += caracteresPosibles.charAt(Math.floor(Math.random() * caracteresPosiblesLargo));
    }
    return tokenGenerado;
}

async function getTimeOffset(){
    let consulta = "SELECT paramValor FROM paramGen WHERE paramId = ? AND paramClave = ?";
    let where = ["token", "tiempoObsoleto"];
    results = await query(consulta, where);
    // console.log((parseInt(results[0].paramValor, 10) * 60 * 1000));
    return (parseInt(results[0].paramValor, 10) * 60 * 1000);
}

async function marcarTokenComoObsoleto(token){
    let consulta = "UPDATE token SET tokenObsoleto = true WHERE token = ?";
    let where = [token];
    results = await query(consulta, where);
    // console.log(results);
}

async function estaObsoleto(tokenCompleto){
    let aux = true;

    // console.log(tokenCompleto.tokenDateTime+'.000Z');

    let fecha = new Date(tokenCompleto.tokenDateTime+'.000Z');
    let obsoleto = await fechaObsoleta(fecha);

    // console.log(obsoleto);

    if (obsoleto){
        // modifico el valor de tokenObsoleto
        marcarTokenComoObsoleto(tokenCompleto.token)
        aux = true

    }else{
        aux = false;
    }
    return aux;
}

module.exports = {
    async tokenObsoleto(token){
        let aux = true;

        let consulta = "SELECT * FROM token WHERE token = ?";
        let where = [token];
        results = await query(consulta, where);
        // console.log(results);
        let tokenBD = results[0];
        
        if (results.length > 0){
            // let obsoleto = await estaObsoleto(tokenBD);
            // if (obsoleto) {
            //     aux = true
            // }else{
            //     aux = false;
            // }
            aux = await estaObsoleto(tokenBD);
        }else{
            // no existe el token
            aux = true
        }
        return aux;
    },

    async getToken(){
        let aux = null;
        let consulta = "SELECT * FROM token WHERE tokenObsoleto = false";
        let where = [];
        results = await query(consulta, where);

        let tokenBD = results[0]
        // console.log(tokenBD);
        if (results.length > 0){
            let obsoleto = await estaObsoleto(tokenBD);
            if (!obsoleto) {
                aux = tokenBD.token
            }
        }
        // console.log("antes de salir - " +aux);
        return aux;
    },

    async nuevoToken(usuario){
        let aux = null;
        let nuevoToken = generarNuevoToken(18);
        let consulta = 'INSERT INTO token(token, tokenDateTime, tokenUsuario) VALUES (?, datetime("now"), ?)';
        let where = [nuevoToken, usuario];

        results = await query(consulta, where);
        console.log(results);
        // if (results.length > 0){
        //     aux = results[0].token
        // }

        return nuevoToken;
    }
}

class Token{
    constructor(tokenUser, token, datetime, obsolete){
        this.user = tokenUser;
        this.token = token;
        this.datetime = new Date(datetime);
        this.obsolete = obsolete
    }
}