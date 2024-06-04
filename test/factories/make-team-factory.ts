import { faker } from '@faker-js/faker'; 
import { Team } from '../../src/core/@types/team-types';

type TeamFactory = Partial<Team>;

export function makeTeamFactory({ id, name }: TeamFactory){
    const team: Team = {
        id: id ?? faker.string.uuid(),
        name: name ?? faker.person.fullName(),
    }

    return team;
}