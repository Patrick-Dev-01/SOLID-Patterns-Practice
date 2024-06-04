import { CoachRepository } from "../../core/repositories/coach-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeleteCoachUseCaseRequest{
    id: string;
}

export class DeleteCoachUseCase{
    constructor(
        private coachRepository: CoachRepository
    ){}

    async execute({ id }: DeleteCoachUseCaseRequest): Promise<void>{
        const coach = await this.coachRepository.findById(id);

        if(!coach){
            throw new ResourceNotFoundError();  
        }
        
        await this.coachRepository.delete(coach);
    }
}