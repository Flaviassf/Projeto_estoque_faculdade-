const express = require('express');
const { MongoClient, ObjectId } = require ('mongodb')
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


//conexao 
//const uri = "mongodb://localhost:27017"
//const client = new MongoClient(uri)
//const dbName = "controleEstoque"

/*let db;

async function connectDB() {

    await client.connect();
    db = client.db(dbName);
    console.Console.log("Mongo conectado");
}

connectDB();
*/
const uri = "mongodb://127.0.0.1:27017/controleEstoque"
async function connectDB() {
  try {
    // Replace with your actual connection string
    await mongoose.connect(uri);
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1); // Stop the app if DB is down
  }
}

connectDB();

const FornecedorSchema = new mongoose.Schema({
    nome: String,
    cnpj: String,
    endereco: String,
    email: String,
    telefone: String,
    nomeContato: String
});

const FornecedorDB = mongoose.model('Fornecedor', FornecedorSchema);

app.listen(4000, () => {
    console.log('Servidor rodando na porta 4000');
});

// API
app.get('/', (req, res) => {
    res.send('Servidor funcionando!');
});

app.get('/fornecedor/', async (req, res) => {
    try {
        const fornecedores = await FornecedorDB.find({});
        res.status(201).json(fornecedores);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

app.get('/fornecedor/buscaCnpj/:cnpjParm', async (req, res) => {
    try {
        const { cnpjParm } = req.params;
        const fornecedores = await FornecedorDB.find({ cnpj: cnpjParm });
        //console.log(fornecedores)
        res.status(201).json(fornecedores);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

app.post('/fornecedor', async(req, res) => {

    try {
        delete req.body._id
        const fornecedor = new FornecedorDB(req.body);
        //console.log(fornecedor)
        //console.log(req.body)
        await fornecedor.save();
        res.status(201).json(fornecedor);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

app.put('/fornecedor', async (req, res) =>{
    //const { id } = req.params;
    console.log(req.body)
    const id = req.body._id;
    delete req.body._id
    const fornecedor = req.body;

    // Atualiza o documento e retorna o novo documento atualizado
    const fornecedorAtualizado = await FornecedorDB.findByIdAndUpdate(id, fornecedor, { 
      new: true, 
      runValidators: true 
    });

    if (!fornecedorAtualizado) {
      return res.status(404).json({ mensagem: 'Fornecedor não encontrado.' });
    }

    res.status(200).json(fornecedorAtualizado);
});

app.delete('/fornecedor/:id', async (req, res) =>{
    try {
        const { id } = req.params;

        const fornecedorExcluido = await FornecedorDB.findByIdAndDelete(id);

        if (!fornecedorExcluido) {
        return res.status(404).json({
            mensagem: 'Fornecedor não encontrado.'
        });
        }

        res.status(200).json({
        mensagem: 'Fornecedor excluído com sucesso.'
        });

    } catch (error) {
        res.status(500).json({erro: error.message});
    }
})


const ProdutoSchema = new mongoose.Schema({
    nome: String,
    codigo: Number,
    quantidade: Number,
    descricao: String,
    categoria: Number
});

const ProdutoDB = mongoose.model('Produto', ProdutoSchema);

app.get('/produto/', async (req, res) => {
    try {
        const produtos = await ProdutoDB.find({});
        res.status(201).json(produtos);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

app.get('/produto/buscaCodigo/:codigoParm', async (req, res) => {
    try {
        const { codigoParm } = req.params;
        const produtos = await ProdutoDB.find({ codigo: codigoParm });
        //console.log(produtos)
        res.status(201).json(produtos);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

app.post('/produto', async(req, res) => {

    try {
        delete req.body._id
        const produto = new ProdutoDB(req.body);
        //console.log(fornecedor)
        //console.log(req.body)
        await produto.save();
        res.status(201).json(produto);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

app.put('/produto', async (req, res) =>{
    //const { id } = req.params;
    console.log(req.body)
    const id = req.body._id;
    delete req.body._id
    const produto = req.body;

    // Atualiza o documento e retorna o novo documento atualizado
    const produtoAtualizado = await ProdutoDB.findByIdAndUpdate(id, produto, { 
      new: true, 
      runValidators: true 
    });

    if (!produtoAtualizado) {
      return res.status(404).json({ mensagem: 'Produto não encontrado.' });
    }

    res.status(200).json(produtoAtualizado);
});

app.delete('/produto/:id', async (req, res) =>{
    try {
        const { id } = req.params;

        const produtoExcluido = await ProdutoDB.findByIdAndDelete(id);

        if (!produtoExcluido) {
        return res.status(404).json({
            mensagem: 'Produto não encontrado.'
        });
        }

        res.status(200).json({
        mensagem: 'Produto excluído com sucesso.'
        });

    } catch (error) {
        res.status(500).json({erro: error.message});
    }
})


const ProdutoFornecedorSchema = new mongoose.Schema({
    idProduto: String,
    nomeProduto: String,
    idFornecedor: String,
    nomeFornecedor: String
});

const ProdutoFornecedorDB = mongoose.model('ProdutoFornecedor', ProdutoFornecedorSchema);

app.get('/produtoFornecedor/', async (req, res) => {
    try {
        const produtosFornecedores = await ProdutoFornecedorDB.find({});
        res.status(201).json(produtosFornecedores);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

app.get('/produtoFornecedor/buscaVinculo/:idProdutoParm/:idFornecedorParm', async (req, res) => {
    try {
        const { idProdutoParm, idFornecedorParm } = req.params;
        const produtosFornecedores = await ProdutoFornecedorDB.find({ idProduto: idProdutoParm, idFornecedor: idFornecedorParm});
        //console.log(produtos)
        res.status(201).json(produtosFornecedores);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

app.post('/produtoFornecedor', async(req, res) => {

    try {
        delete req.body._id
        const produtoFornecedor = new ProdutoFornecedorDB(req.body);
        //console.log(fornecedor)
        //console.log(req.body)
        await produtoFornecedor.save();
        res.status(201).json(produtoFornecedor);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

app.put('/produtoFornecedor', async (req, res) =>{
    //const { id } = req.params;
    console.log(req.body)
    const id = req.body._id;
    delete req.body._id
    const produtoFornecedor = req.body;

    // Atualiza o documento e retorna o novo documento atualizado
    const produtoFornecedorAtualizado = await ProdutoFornecedorDB.findByIdAndUpdate(id, produtoFornecedor, { 
      new: true, 
      runValidators: true 
    });

    if (!produtoFornecedorAtualizado) {
      return res.status(404).json({ mensagem: 'Produto não encontrado.' });
    }

    res.status(200).json(produtoFornecedorAtualizado);
});

app.delete('/produtoFornecedor/:id', async (req, res) =>{
    try {
        const { id } = req.params;

        const produtoFornecedorExcluido = await ProdutoFornecedorDB.findByIdAndDelete(id);

        if (!produtoFornecedorExcluido) {
        return res.status(404).json({
            mensagem: 'Produto Fornecedor não encontrado.'
        });
        }

        res.status(200).json({
        mensagem: 'Produto Fornecedor excluído com sucesso.'
        });

    } catch (error) {
        res.status(500).json({erro: error.message});
    }
})
