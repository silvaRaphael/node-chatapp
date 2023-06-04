import './websocket';
import express from 'express';
import http from 'node:http';
import cors from 'cors';
import { routes } from './routes';
import { corsOptions } from './utils/configs';

const app = express();

const server = http.createServer(app);

app.use(cors(corsOptions));

app.use(express.json());

app.use(routes);

export { server };
