const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./estoque.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco:', err.message);
    } else {
        console.log('Banco conectado!');
    }
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS fornecedores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome_empresa TEXT NOT NULL,
            cnpj TEXT UNIQUE NOT NULL,
            endereco TEXT NOT NULL,
            telefone TEXT NOT NULL,
            email TEXT NOT NULL,
            contato TEXT NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS produtos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            codigo_barras TEXT UNIQUE NOT NULL,
            descricao TEXT NOT NULL,
            quantidade INTEGER,
            categoria TEXT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS produto_fornecedor (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            produto_id INTEGER,
            fornecedor_id INTEGER
        )
    `);
});

module.exports = db;
