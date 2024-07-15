import express from 'express';
import { footballRoutes } from './infra/routes/football';
import { salonRoutes } from './infra/routes/salon';

const app = express();

app.use(express.json());
app.use(`/football`, footballRoutes);
app.use(`/salon`, salonRoutes);

export { app }

