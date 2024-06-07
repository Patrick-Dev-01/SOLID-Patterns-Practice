import { Coach } from "../../core/types/coach-types";
import { CoachRepository } from "../../core/repositories/coach-repository";

interface FetchCoachsUseCaseResponse{
    coachs: Coach[];
}

export class FetchCoachsUseCase{
    constructor(
        private coachRepository: CoachRepository
    ){}

    async execute(): Promise<FetchCoachsUseCaseResponse>{
        const coachs = await this.coachRepository.findMany();

        return { coachs };
    }
}