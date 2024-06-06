import { TeamRepository } from "../../core/repositories/team-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeleteTeamUseCaseRequest{
    id: string;
}

export class DeleteTeamUseCase{
    constructor(
        private teamRepository: TeamRepository
    ){}

    async execute({ id }: DeleteTeamUseCaseRequest): Promise<void>{
        const team = await this.teamRepository.findById(id)

        if(!team){
            throw new ResourceNotFoundError();  
        }
        
        await this.teamRepository.delete(team);
    }
}