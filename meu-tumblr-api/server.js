const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Conecta ao banco de dados
connectDB();

const app = express();

// Middlewares
app.use(cors()); // Permite requisições de outras origens (nosso frontend)
app.use(express.json()); // Permite que o express entenda JSON
app.use(express.urlencoded({ extended: false })); // Permite que o express entenda dados de formulário

// Rota de teste
app.get('/', (req, res) => {
  res.send('API do Mosaico está rodando!');
});

// Definindo as rotas da nossa API
app.use('/api/posts', require('./routes/posts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));