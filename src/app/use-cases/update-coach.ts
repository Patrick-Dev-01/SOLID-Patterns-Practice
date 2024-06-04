import { Coach } from "../../core/@types/coach-types";
import { CoachRepository } from "../../core/repositories/coach-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface UpdateCoachUseCaseRequest{
    id: string;
    name: string;
    team_id: string;
}

interface UpdateCoachUseCaseResponse{
    coach: Coach;
}

export class UpdateCoachUseCase{
    constructor(
        private coachRepository: CoachRepository
    ){}

    async execute({ id, name, team_id }: UpdateCoachUseCaseRequest): Promise<UpdateCoachUseCaseResponse>{
        const coach = await this.coachRepository.findById(id);

        if(!coach){
            throw new ResourceNotFoundError();
        }

        coach.name = name;
        coach.team_id = team_id;

        await this.coachRepository.update(coach);

        return { coach }
    }
}