const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
//Hvq7JOGuyWWdrapV
// Conectando ao banco de dados MongoDB
mongoose.connect('digite_sua_url_de_conexao_aqui', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


app.get('/',(req,res) => {
    res.send('hi')
})
// Definindo o schema do objeto de doação
const doacaoSchema = new mongoose.Schema({
    nome: String,
    cpf: String,
    item: String,
});

// Definindo o modelo da doação
const Doacao = mongoose.model('Doacao', doacaoSchema);

// Rota para cadastrar uma nova doação
app.post('/doacoes', async (req, res) => {
    try {
        const { nome, cpf, item } = req.body;
        const novaDoacao = new Doacao({ nome, cpf, item });
        await novaDoacao.save();
        res.status(201).json(novaDoacao);
    } catch (error) {
        res.status(500).json({ error: 'Ocorreu um erro ao cadastrar a doação.' });
    }
});

    // Rota para listar todas as doações
    app.get('/doacoes', async (req, res) => {
        try {
            const doacoes = await Doacao.find();
            res.json(doacoes);
        } catch (error) {
            res.status(500).json({ error: 'Ocorreu um erro ao buscar as doações.' });
        }
    });

    // Rota para atualizar uma doação
    app.put('/doacoes/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const { nome, cpf, item } = req.body;
            const doacao = await Doacao.findByIdAndUpdate(id, { nome, cpf, item }, { new: true });
            res.json(doacao);
        } catch (error) {
            res.status(500).json({ error: 'Ocorreu um erro ao atualizar a doação.' });
        }
    });

    // Rota para deletar uma doação
    app.delete('/doacoes/:id', async (req, res) => {
        try {
            const { id } = req.params;
            await Doacao.findByIdAndDelete(id);
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ error: 'Ocorreu um erro ao deletar a doação.' });
        }
    });

// Iniciando o servidor
app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
});
