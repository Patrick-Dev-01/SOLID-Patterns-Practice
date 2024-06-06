import { env } from "../../../core/env/index";
import mysql2 from 'mysql2';

export class MySQLService{
    private mysql;
    
    constructor(){
        this.mysql = mysql2.createConnection({
            host: env.MYSQL_HOST,
            user: env.MYSQL_USER,
            password: env.MYSQL_PASSWORD,
            database: env.NODE_ENV !== 'test' ? env.MYSQL_DATABASE : 'test',       
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
}