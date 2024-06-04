import { Coach } from "../../core/@types/coach-types";
import { CoachRepository } from "../../core/repositories/coach-repository";
import { randomUUID } from 'node:crypto';

interface CreateCoachUseCaseRequest{
    name: string;
    team_id: string;
}

interface CreateCoachUseCaseResponse{
    coach: Coach;
}

export class CreateCoachUseCase{
    constructor(
        private coachRepository: CoachRepository
    ){}

    async execute({ name, team_id }: CreateCoachUseCaseRequest): Promise<CreateCoachUseCaseResponse>{
        const coach = { 
            id: randomUUID(),
            name,
            team_id
        }

        await this.coachRepository.create(coach);

        return { coach }
    }
}