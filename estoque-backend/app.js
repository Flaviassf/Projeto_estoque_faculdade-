const express = require('express');
const db = require('./database');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Servidor funcionando!');
});
app.post('/fornecedores', (req, res) => {

    const {
        nome_empresa,
        cnpj,
        endereco,
        telefone,
        email,
        contato
    } = req.body;

    const sql = `
        INSERT INTO fornecedores
        (nome_empresa, cnpj, endereco, telefone, email, contato)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.run(
        sql,
        [nome_empresa, cnpj, endereco, telefone, email, contato],
        function(err) {

            if (err) {
                return res.status(400).json({
                    erro: err.message
                });
            }

            res.json({
                mensagem: 'Fornecedor cadastrado com sucesso!',
                id: this.lastID
            });

        }
    );

});
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
