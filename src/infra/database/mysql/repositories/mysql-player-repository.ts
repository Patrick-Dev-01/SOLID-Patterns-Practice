import { PlayerRepository } from "../../../../core/repositories/player-repository";
import { Player } from "../../../../core/types/player-types";
import { MySQLService } from "../mysql";

export class MySQLPlayerRepository implements PlayerRepository{
    private mysql = new MySQLService();
    
    async findManyByTeam(id: string): Promise<Player[] | null> {
        throw new Error("Method not implemented.");
    }
    
    async findMany(): Promise<Player[]> {
        const players = await this.mysql.query(`SELECT *FROM players`) as Player[];

        return players;
    }

    async findById(id: string): Promise<Player | null> {
        const data = await this.mysql.query(`SELECT *FROM players WHERE id = '${id}'`) as Player[];

        const player = data[0];

        return player;
    }

    async create(player: Player): Promise<Player> {
        await this.mysql.query(
            `INSERT INTO players (id, name, shirt_number, position, starter, team_id ) 
            VALUES ('${player.id}', "${player.name}", ${player.shirt_number}, '${player.position}', 
            ${player.starter}, '${player.team_id}')`
        );

        return player;
    }

    async update(player: Player): Promise<Player | null> {
        await this.mysql.query(
            `UPDATE players SET name = "${player.name}", shirt_number = ${player.shirt_number}, position = '${player.position}',
                starter = ${player.starter}, team_id = '${player.team_id}' WHERE id = '${player.id}'`
        );

        return player;
    }

    async delete(player: Player): Promise<void> {
        await this.mysql.query(
            `DELETE FROM players WHERE id = '${player.id}'`
        );
    }
}