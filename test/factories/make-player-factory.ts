import { faker } from "@faker-js/faker";
import { Player } from "../../src/core/@types/player-types";
import { MySQLService } from "../../src/infra/database/mysql/mysql";

enum Position {
    goleiro = "goleiro",
    zagueiro = "zagueiro",
    volante = "volante",
    meio_campo = "meio campo",
    atacante = "atacante",
}

export function makePlayer({ id, name, position, shirt_number, starter, team_id }: Partial<Player>){
    const player: Player = {
        id: id ?? faker.string.uuid(),
        name: name ?? faker.person.fullName(),
        position: position ?? faker.helpers.enumValue(Position),
        shirt_number: shirt_number ?? faker.number.int(100),
        starter: starter ?? faker.datatype.boolean(),
        team_id: team_id ?? faker.string.uuid()
    }
    
    return player;
}

export class PlayerFactory{
    private mysql = new MySQLService();

    async makeMySQLPlayer(data: Partial<Player>): Promise<Player>{
        const player = makePlayer(data);

        // await this.mysql.query(`INSERT INTO teams (id, name) VALUES ('${player.id}', '${player.name}')`);

        return player;
    }
}