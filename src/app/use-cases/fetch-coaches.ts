import { Coach } from "../../core/types/coach-types";
import { CoachRepository } from "../../core/repositories/coach-repository";

interface FetchCoachesUseCaseResponse{
    coach: Coach[];
}

export class FetchCoachesUseCase{
    constructor(
        private coachRepository: CoachRepository
    ){}

    async execute(): Promise<FetchCoachesUseCaseResponse>{
        const coach = await this.coachRepository.findMany();

        return { coach };
    }
}