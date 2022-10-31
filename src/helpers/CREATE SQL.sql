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

INSERT INTO usuario(usuUsuario, usuPass)
VALUES ("hola", "123")
;

SELECT * FROM usuario;

INSERT INTO token(token, tokenDateTime, tokenUsuario)
VALUES ("token", datetime('now'), 1)
;


SELECT * FROM usuario;
SELECT * FROM token;
