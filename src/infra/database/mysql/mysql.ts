import { env } from "../../../core/env/index";
import mysql2 from 'mysql2';

export class MySQLService{
    private mysql;
    
    constructor(){
        this.mysql = mysql2.createConnection({
            host: env.MYSQL_HOST,
            user: env.MYSQL_USER,
            password: env.MYSQL_PASSWORD,
            database: env.NODE_ENV === 'test' ? 'test' : env.MYSQL_DATABASE,       
        });
    }

    async query(query: string){
        return new Promise((resolve, reject) => {
            this.mysql.query(query, (err, data) => {
                if(err) reject(err);
                resolve(data as unknown);
            });
        });
    }

    async flushDatabase(){
        if(env.NODE_ENV === 'test'){
            await this.query('SET FOREIGN_KEY_CHECKS = 0;');
            await this.query('TRUNCATE table coachs');
            await this.query('TRUNCATE table teams');
            await this.query('TRUNCATE table players');
            await this.query('SET FOREIGN_KEY_CHECKS = 1;');
        }
    }
}