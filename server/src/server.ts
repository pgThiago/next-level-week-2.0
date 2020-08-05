import express from 'express';
import routes from './routes';

const app = express()

app.use(express.json());

// Corpo (request.body): Dados para criação ou atualização de um registro
// Route params (request.params): Identificar recurso para atualizar ou deletar
// Query params (request.query) : Paginação, filtros, ordenação

app.use(routes);

app.listen(3333);