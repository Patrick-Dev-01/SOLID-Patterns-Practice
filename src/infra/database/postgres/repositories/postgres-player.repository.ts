import { PlayerRepository } from "../../../../core/repositories/player-repository";
import { Player } from "../../../../core/types/player-types";
import { PostgresSQLService } from "../postgres";

export class PostgresPlayerRepository implements PlayerRepository{
    private postgres = new PostgresSQLService();

    async findMany(): Promise<Player[] | null> {
        const data = await this.postgres.query(`SELECT *FROM players`);

        const players = data.rows;

        return players;
    }

    async findManyByTeam(id: string): Promise<Player[] | null> {
        throw new Error("Method not implemented.");
    }

    async findById(id: string): Promise<Player | null> {
        const data = await this.postgres.query(`
            SELECT id, name, position, shirt_number, starter, team_id  
            FROM players WHERE id = '${id}'`
        );

        const player: Player = data.rows[0];

        return player;
    }

    async create(player: Player): Promise<Player> {
        await this.postgres.query(
            `INSERT INTO players (id, name, shirt_number, position, starter, team_id ) 
            VALUES ('${player.id}', '${player.name}', ${player.shirt_number}, '${player.position}', 
            ${player.starter}, '${player.team_id}')`
        );

        return player;
    }

    async update(player: Player): Promise<Player | null> {
        await this.postgres.query(
            `UPDATE players SET name = '${player.name}', shirt_number = ${player.shirt_number}, position = '${player.position}',
                starter = ${player.starter}, team_id = '${player.team_id}' WHERE id = '${player.id}'`
        );

        return player;
    }
    
    async delete(player: Player): Promise<void> {
        await this.postgres.query(
            `DELETE FROM players WHERE id = '${player.id}'`
        );
    }
}