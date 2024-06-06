import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
    PORT: z.coerce.number().default(3333),
    NODE_ENV: z.enum(['test', 'development', 'production']),
    MYSQL_HOST: z.string(),
    MYSQL_USER: z.string(),
    MYSQL_PASSWORD: z.string(),
    MYSQL_PORT: z.string(),
    MYSQL_DATABASE: z.string(), 
    POSTGRES_USER: z.string(),
    POSTGRES_PASSWORD: z.string(),
    POSTGRES_DB: z.string()
})

const _env = envSchema.safeParse(process.env);

if(_env.success === false){
    console.error('Invalid Environment variables', _env.error.format());
    throw new Error('Invalid environment variables');
}

export const env = _env.data;

