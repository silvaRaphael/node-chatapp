import express from 'express';
import http from 'node:http';
import cors from 'cors';
import { routes } from './routes';

const app = express();

const server = http.createServer(app);

const corsOptions = {
	origin: ['http://localhost:3000'],
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(routes);

export { server };
