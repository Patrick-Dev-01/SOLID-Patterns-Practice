import { Team } from "../../core/types/team-types";
import { TeamRepository } from "../../core/repositories/team-repository";

interface FetchTeamsUseCaseResponse{
    teams: Team[];
}

export class FetchTeamsUseCase{
    constructor(
        private teamRepository: TeamRepository,
    ){}

    async execute(): Promise<FetchTeamsUseCaseResponse>{
        const teams = await this.teamRepository.findMany();

        return { teams }
    }
}