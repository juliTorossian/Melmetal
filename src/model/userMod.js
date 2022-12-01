const { query } = require('../helpers/querys');


class User {
    constructor(user, pass){
        this.user = user;
        this.pass = pass;
        this.token = "token";
    }
}

module.exports = {

    async iniciarSesion(user, pass){
        let usuId = 0;
        let consulta = "SELECT * FROM usuario WHERE usuUsuario = ? AND usuPass = ?";
        let where = [user, pass];
        
        results = await query(consulta, where);
        // console.log(results);
        
        if (results.length > 0){
            usuId = results[0].usuId
        }

        return usuId;
    },
    getUserId(user){
        let aux = 0;
        users.forEach(usr => {
            if (usr.user == user){
                aux = usr.id;
            }
        });
        return aux;
    },

}