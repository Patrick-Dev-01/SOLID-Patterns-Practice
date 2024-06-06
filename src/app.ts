import express from 'express';
import { footballRoutes } from './infra/routes/football';

const app = express();

app.use(express.json());
app.use(`/football`, footballRoutes);

export { app }

