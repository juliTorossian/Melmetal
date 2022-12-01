const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("./src/db.sqlite", err => {
    if (err){
        console.error(err.message);
    }else{
        console.log("DB ok!");
    }
});

module.exports = db;