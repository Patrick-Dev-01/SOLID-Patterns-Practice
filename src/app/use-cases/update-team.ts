import { Team } from "../../core/@types/team-types";
import { TeamRepository } from "../../core/repositories/team-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface UpdateTeamUseCaseRequest{
    id: string;
    name: string;
}

interface UpdateTeamUseCaseResponse{
    team: Team;
}

export class UpdateTeamUseCase{
    constructor(
        private teamRepository: TeamRepository
    ){}

    async execute({ id, name }: UpdateTeamUseCaseRequest): Promise<UpdateTeamUseCaseResponse>{
        const team = await this.teamRepository.findById(id)

        if(!team){
            throw new ResourceNotFoundError();  
        }

        team.name = name
        
        await this.teamRepository.update(team);

        return { team }
    }
}