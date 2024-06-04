import { faker } from "@faker-js/faker";
import { Player } from "../../src/core/@types/player-types";

enum Position {
    goleiro = "goleiro",
    zagueiro = "zagueiro",
    volante = "volante",
    meio_campo = "meio campo",
    atacante = "atacante",
}

type PlayerFactory = Partial<Player>;

export function makePlayerFactory({ id, name, position, shirt_number, starter, team_id }: PlayerFactory){
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