import { CoachRepository } from "../../../../core/repositories/coach-repository";
import { Coach } from "../../../../core/types/coach-types";
import { MySQLService } from "../mysql";

export class MySQLCoachRepository implements CoachRepository{
    private mysql = new MySQLService();
    
    async findById(id: string): Promise<Coach | null> {
        const data = await this.mysql.query(`SELECT *FROM coachs WHERE id = '${id}'`) as Coach[];

        const coach = data[0];

        return coach;
    }

    async findMany(): Promise<Coach[]> {
        const coachs = await this.mysql.query("SELECT *FROM coachs") as Coach[];
        
        return coachs;
    }

    async create(coach: Coach): Promise<Coach> {
        await this.mysql.query(`INSERT INTO coachs (id, name) VALUES ('${coach.id}', "${coach.name}")`);

        return coach;
    }

    async update(coach: Coach): Promise<Coach | null> {
        await this.mysql.query(`UPDATE teams SET name = '${coach.name}' WHERE id = '${coach.id}'`) as Coach;

        return coach;
    }

    async delete(coach: Coach): Promise<void> {
        await this.mysql.query(`DELETE FROM coachs WHERE id = '${coach.id}'`);
    }
} 