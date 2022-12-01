-- SQLite

DROP TABLE IF EXISTS usuario;
CREATE TABLE IF NOT EXISTS usuario(
    usuId       INTEGER PRIMARY KEY AUTOINCREMENT,
    usuUsuario  TEXT NOT NULL,
    usuPass     TEXT NOT NULL
);

DROP TABLE IF EXISTS token;
CREATE TABLE IF NOT EXISTS token(
    token           TEXT PRIMARY KEY,
    tokenDateTime   TEXT NOT NULL,
    tokenObsoleto   INTEGER DEFAULT 0,
    tokenUsuario    INTEGER,
    FOREIGN KEY (tokenUsuario) REFERENCES usuario(usuId)
);

DROP TABLE IF EXISTS paramGen;
CREATE TABLE IF NOT EXISTS paramGen(
    paramId         TEXT PRIMARY KEY,
    paramClave      TEXT NOT NULL,
    paramValor      TEXT NOT NULL
);

INSERT INTO usuario(usuUsuario, usuPass)
VALUES ("hola", "123")
;

SELECT * FROM usuario;

INSERT INTO token(token, tokenDateTime, tokenUsuario)
VALUES ("token", datetime('now'), 1)
;

INSERT INTO paramGen(paramId, paramClave, paramValor)
VALUES ("token", "tiempoObsoleto", "10")
;


SELECT * FROM usuario;
SELECT * FROM token;
