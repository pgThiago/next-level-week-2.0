import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express()
app.use(cors());
app.use(express.json());

// Corpo (request.body): Dados para criação ou atualização de um registro
// Route params (request.params): Identificar recurso para atualizar ou deletar
// Query params (request.query) : Paginação, filtros, ordenação

app.use(routes);

app.listen(3333);
