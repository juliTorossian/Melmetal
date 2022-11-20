const db = require("../db");

function query(query, wheres){
    return new Promise(async (resolve, reject) => {
        db.all(query, wheres, (err, rows) => {
            if (err){
                console.error(" *** ERR - ", err);
                return reject({message: err, code: 401})
            }
            return resolve(rows);
        });
    });
}


module.exports = {
    query,
}