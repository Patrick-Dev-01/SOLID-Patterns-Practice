import { faker } from '@faker-js/faker'; 
import { Team } from '../../src/core/@types/team-types';
import { MySQLService } from '../../src/infra/database/mysql/mysql';

export function makeTeam({ id, name }: Partial<Team>){
    const team: Team = {
        id: id ?? faker.string.uuid(),
        name: name ?? faker.person.fullName(),
    }

    return team;
}

export class TeamFactory{
    private mysql = new MySQLService();

    async makeMySQLTeam(data: Partial<Team>): Promise<Team>{
        const team = makeTeam(data);

        await this.mysql.query(`INSERT INTO teams (id, name) VALUES ('${team.id}', '${team.name}')`);

        return team;
    }
}