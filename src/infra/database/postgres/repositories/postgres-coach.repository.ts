import { CoachRepository } from "../../../../core/repositories/coach-repository";
import { Coach } from "../../../../core/types/coach-types";
import { PostgresSQLService } from "../postgres";

export class PostgresCoachRepository implements CoachRepository{
    private postgres = new PostgresSQLService();

    async findById(id: string): Promise<Coach | null> {
        const data = await this.postgres.query(`SELECT id, name FROM coachs WHERE id = '${id}'`);

        const coach: Coach = data.rows[0];

        return coach;
    }

    async findMany(): Promise<Coach[]> {
        const data = await this.postgres.query(`SELECT *FROM coachs`);

        const coachs = data.rows;

        return coachs;
    }

    async create(coach: Coach): Promise<Coach> {
        await this.postgres.query(`INSERT INTO coachs (id, name) VALUES ('${coach.id}', '${coach.name}')`);

        return coach;
    }

    async update(coach: Coach): Promise<Coach | null> {
        await this.postgres.query(`UPDATE coachs SET name = '${coach.name}' WHERE id = '${coach.id}'`);

        return coach;
    }

    async delete(coach: Coach): Promise<void> {
        await this.postgres.query(`DELETE FROM coachs WHERE id = '${coach.id}'`);
    }
}