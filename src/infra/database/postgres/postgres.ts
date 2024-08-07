import { Client } from 'pg';
import { env } from '../../../core/env';

export class PostgresSQLService{
    private postgres;
    
    constructor(){
        this.postgres = new Client({
            host: env.POSTGRES_HOST,
            user: env.POSTGRES_USER,
            password: env.POSTGRES_PASSWORD,
            database: env.NODE_ENV === 'test' ? 'test' : env.POSTGRES_DB,   
        });

        this.postgres.connect();
    }
    
    async query(query: string){
        try {
            const result = await this.postgres.query(query);
            
            return result as any;
        } catch(error) {
            console.error(error)
        }
    }
}