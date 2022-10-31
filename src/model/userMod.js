const db = require("../db");
const users = require("../json/users.json");


class User {
    constructor(user, pass){
        this.user = user;
        this.pass = pass;
        this.token = "token";
    }
}

module.exports = {

    async iniciarSesion(user, pass){
        let aux = false;
        // users.forEach(usr => {
        //     if (usr.user == user && usr.pass == pass){
        //         aux = true;
        //     }
        // });

        // let query = "SELECT * FROM usuario WHERE 'usuUsuario' = ?;";
        // let where = [user];
        // db.all(query, where, (err, rows) => {
        //     if (err) {
        //         return console.log(err);
        //     }else{
        //         console.log(rows);
        //     }
        // });
        // return aux;

        let query = "SELECT * FROM usuario";
        let where = [];
        db.all(query, where, (err, rows) => {
            if (err) {
                return console.log(err);
            }else{
                console.log(rows);
            }
        });
        return aux;
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