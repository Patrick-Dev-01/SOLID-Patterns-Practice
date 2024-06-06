import { Team } from "../../../../core/@types/team-types";
import { TeamRepository } from "../../../../core/repositories/team-repository";
import { MySQLService } from "../mysql";

export class MySQLTeamRepository implements TeamRepository{
    private mysql = new MySQLService();
   
    async findById(id: string): Promise<Team | null> {
        const data = await this.mysql.query(`SELECT id, name FROM teams WHERE id = '${id}'`) as Team[];

        const team = data[0];

        return team;
    }

    async fetchAll(): Promise<Team[]> {
        throw new Error("Method not implemented.");
    }

    async create(team: Team): Promise<Team> {
        await this.mysql.query(`INSERT INTO teams (id, name) VALUES ('${team.id}', '${team.name}')`);

        return team;
    }

    async update(team: Team) {
        await this.mysql.query(`UPDATE teams SET name = '${team.name}' WHERE id = '${team.id}'`) as Team;

        return team;
    }

    async delete(team: Team): Promise<void> {
        throw new Error("Method not implemented.");
    }
}