import { TeamRepository } from "../../../../core/repositories/team-repository";
import { Team } from "../../../../core/types/team-types";
import { PostgresSQLService } from "../postgres";

export class PostgresTeamRepository implements TeamRepository{
    private postgres = new PostgresSQLService();
    
    async findById(id: string): Promise<Team | null> {
       const team = await this.postgres.query(`SELECT id, name FROM teams WHERE id = '${id}'`) as Team;

       return team;
    }

    async findMany(): Promise<Team[]> {
        throw new Error("Method not implemented.");
    }

    async create(team: Team): Promise<Team> {
        await this.postgres.query(`INSERT INTO teams (id, name) VALUES ('${team.id}', '${team.name}')`);

        return team;
    }

    async update(team: Team): Promise<Team | null> {
        await this.postgres.query(`UPDATE teams SET name = '${team.name}' WHERE id = '${team.id}'`);

        return team;
    }

    async delete(team: Team): Promise<void> {
        await this.postgres.query(`DELETE FROM teams WHERE id = '${team.id}'`);
    }

}