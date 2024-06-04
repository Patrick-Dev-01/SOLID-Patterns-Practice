import { faker } from "@faker-js/faker";
import { Coach } from "../../src/core/@types/coach-types";

type CoachFactory = Partial<Coach>;

export function makeCoachFactory({ id, name, team_id }: CoachFactory){
    const coach: Coach = {
        id: id ?? faker.string.uuid(),
        name: name ?? faker.person.fullName(),
        team_id: team_id ?? faker.string.uuid(),
    }

    return coach;
}