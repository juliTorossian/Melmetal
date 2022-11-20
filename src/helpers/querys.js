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

// function set(query, values){
//     return new Promise(async (resolve, reject) => {
        
//         pool.getConnection((err,connection)=> {
//             if(err)
//             throw err;

//             connection.query(query, [values], function (err, result) {
//                 if (err) {
//                     // console.error(" *** ERROR - ", err);
//                     console.log(err.code);
//                     console.log(err[0].code);
//                     if (err.code == 'ER_ROW_IS_REFERENCES_2'){
//                         return reject({message: err, code: 1, msg: 'Algun registro referencia a esta linea'})
//                     }else{
//                         return reject({message: err, code: 401})
//                     }                    
//                 }
//                 return resolve(result)
//             });

//             connection.release();
//         });
//     });
// }

// function mod(query, values){
//     return new Promise(async (resolve, reject) => {
        
//         pool.getConnection((err,connection)=> {
//             if(err)
//             throw err;

//             connection.query(query, values, function (err, result) {
//                 if (err) {
//                     console.error(" *** ERROR - ", err);
//                     return reject({message: err, code: 401})
//                 }
//                 return resolve(result)
//             });

//             connection.release();
//         });
//     });
// }

// function del(query, wheres){
//     return new Promise(async (resolve, reject) => {
//         pool.getConnection((err,connection)=> {
//             if(err)
//             throw err;
            
//             connection.query(query, wheres, (err, results) => {
//                 if (err) {
//                     console.error(" *** ERR - ", err);
//                     return reject({message: err, code: 401})
//                 }
//                 return resolve(results);
//             });
//             connection.release();
//         });
//     });
// }

module.exports = {
    query,
    // set,
    // mod,
    // del,
}