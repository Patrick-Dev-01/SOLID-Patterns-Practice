import { faker } from "@faker-js/faker";
import { Player } from "../../src/core/types/player-types";
import { MySQLService } from "../../src/infra/database/mysql/mysql";
import { PostgresSQLService } from "../../src/infra/database/postgres/postgres";

enum Position {
    goleiro = "goleiro",
    zagueiro = "zagueiro",
    volante = "volante",
    meio_campo = "meio campo",
    atacante = "atacante",
    pivo = "pivô",
    ala = "Ala",
    fixo = "fixo"
}

export function makePlayer({ id, name, position, shirt_number, starter, team_id }: Partial<Player>){
    const player: Player = {
        id: id ?? faker.string.uuid(),
        name: name ?? faker.person.fullName().replace("'", ""),
        position: position ?? faker.helpers.enumValue(Position),
        shirt_number: shirt_number ?? faker.number.int(100),
        starter: starter ?? faker.datatype.boolean(),
        team_id: team_id ?? faker.string.uuid()
    }
    
    return player;
}

export class PlayerFactory{
    private mysql = new MySQLService();
    private postgres = new PostgresSQLService();

    async makeMySQLPlayer(data: Partial<Player>): Promise<Player>{
        const player = makePlayer(data);

        await this.mysql.query(`
            INSERT INTO players (id, name, shirt_number, position, starter, team_id ) 
            VALUES ('${player.id}', "${player.name}", ${player.shirt_number}, '${player.position}', 
            ${player.starter}, '${player.team_id}')`
        );

        return player;
    }

    async makePostgresPlayer(data: Partial<Player>): Promise<Player>{
        const player = makePlayer(data);

        await this.postgres.query(`
            INSERT INTO players (id, name, shirt_number, position, starter, team_id ) 
            VALUES ('${player.id}', '${player.name}', ${player.shirt_number}, '${player.position}', 
            ${player.starter}, '${player.team_id}')`
        );

        return player;
    }
}