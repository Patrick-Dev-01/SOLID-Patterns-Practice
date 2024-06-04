import { Team } from "../../core/@types/team-types";
import { TeamRepository } from "../../core/repositories/team-repository";
import { randomUUID } from 'node:crypto';

interface CreateTeamUseCaseRequest{
    name: string;
}

interface CreateTeamUseCaseResponse{
    team: Team;
}

export class CreateTeamUseCase{
    constructor(
        private teamRepository: TeamRepository
    ){}

    async execute({ name }: CreateTeamUseCaseRequest): Promise<CreateTeamUseCaseResponse>{
        const team = { 
            id: randomUUID(),
            name: name
        }

        await this.teamRepository.create(team);

        return { team }
    }
}