import { Team } from "../../core/@types/team-types";
import { TeamRepository } from "../../core/repositories/team-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetTeamByIdUseCaseRequest{
    id: string;
}

interface GetTeamByIdUseCaseResponse{
    team: Team;
}

export class GetTeamByIdUseCase{
    constructor(
        private teamRepository: TeamRepository,
    ){}

    async execute({ id }: GetTeamByIdUseCaseRequest): Promise<GetTeamByIdUseCaseResponse>{
        const team = await this.teamRepository.findById(id);

        if(!team){
            throw new ResourceNotFoundError();
        }

        return { team };
    }
}