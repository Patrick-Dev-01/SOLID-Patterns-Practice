import express from 'express';
import { env } from './env';

const app = express();

app.listen(() => {
    console.log(`Server Running on PORT ${env.PORT}`);
})