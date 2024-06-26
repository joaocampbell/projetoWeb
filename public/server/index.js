const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;
const avaliacoesFile = path.join(__dirname, 'avaliacoes.json');
app.use(express.static(path.join(__dirname, '../www')));

app.use(bodyParser.json());
;

if (fs.existsSync(avaliacoesFile)) {
    // Arquivo existe, então continue com a leitura
    const data = fs.readFileSync(avaliacoesFile, 'utf8');
    console.log('Conteúdo do arquivo:', data);
} else {
    console.error('Arquivo não encontrado:', avaliacoesFile);
}

// Função para ler avaliações do arquivo
const lerAvaliacoes = () => {
    if (fs.existsSync(avaliacoesFile)) {
        const data = fs.readFileSync(avaliacoesFile);
        return JSON.parse(data);
    }
    return {};
};

// Função para escrever avaliações no arquivo
const escreverAvaliacoes = (avaliacoes) => {
    fs.writeFileSync(avaliacoesFile, JSON.stringify(avaliacoes, null, 2));
};

// Rota para receber as avaliações
app.post('/avaliar', (req, res) => {
    const { filme, estrelas } = req.body;

    if (filme && estrelas >= 1 && estrelas <= 5) {
        const avaliacoes = lerAvaliacoes();
        if (!avaliacoes.filmes[filme]) {
            avaliacoes.filmes[filme] = { avaliacoes: [], comentarios: [] };
        }
        avaliacoes.filmes[filme].avaliacoes.push(estrelas);
        escreverAvaliacoes(avaliacoes);
        res.status(200).json({ message: 'Avaliação recebida com sucesso!' });
    } else {
        res.status(400).json({ message: 'Dados de avaliação inválidos!' });
    }
});

// Rota para receber e salvar comentários
app.post('/comentar', (req, res) => {
    const { filme, username, comment } = req.body;
    console.log('Recebido filme:', filme); // Verifique o nome do filme recebido

    if (filme && username && comment) {
        const avaliacoes = lerAvaliacoes();
        console.log('Avaliações atuais:', avaliacoes); // Verifique o estado atual das avaliações

        if (!avaliacoes.filmes[filme]) {
            avaliacoes.filmes[filme] = { avaliacoes: [], comentarios: [] };
            console.log(`Filme '${filme}' inicializado com sucesso.`);
        }

        avaliacoes.filmes[filme].comentarios.push({ username, comment });
        escreverAvaliacoes(avaliacoes);
        res.status(200).json({ message: 'Comentário recebido com sucesso!' });
    } else {
        res.status(400).json({ message: 'Dados de comentário inválidos!' });
    }
});


// Rota para servir o arquivo avaliacoes.json
app.get('/avaliacoes', (req, res) => {
    try {
        const data = fs.readFileSync(avaliacoesFile, 'utf8');
        const avaliacoes = JSON.parse(data);
        res.json(avaliacoes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao carregar avaliações.' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
