import { faker } from "@faker-js/faker";
import { Coach } from "../../src/core/types/coach-types";
import { MySQLService } from "../../src/infra/database/mysql/mysql";
import { PostgresSQLService } from "../../src/infra/database/postgres/postgres";

export function makeCoach({ id, name, team_id }: Partial<Coach>){
    const coach: Coach = {
        id: id ?? faker.string.uuid(),
        name: name ?? faker.person.fullName(),
        team_id: team_id ?? faker.string.uuid(),
    }

    return coach;
}

export class CoachFactory{
    private mysql = new MySQLService();
    private postgres = new PostgresSQLService();

    async makeMySQLCoach(data: Partial<Coach>){
        const coach = makeCoach(data);

        await this.mysql.query(`INSERT INTO coachs (id, name) VALUES ('${coach.id}', "${coach.name}")`);

        return coach;
    }

    async makePostgresCoach(data: Partial<Coach>){
        const coach = makeCoach(data);

        await this.postgres.query(`INSERT INTO coachs (id, name) VALUES ('${coach.id}', '${coach.name}')`);

        return coach;
    }
}