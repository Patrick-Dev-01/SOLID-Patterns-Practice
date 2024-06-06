import { Coach } from "../../core/types/coach-types";
import { CoachRepository } from "../../core/repositories/coach-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetCoachByIdUseCaseRequest{
    id: string;
}

interface GetCoachByIdUseCaseResponse{
    coach: Coach;
}

export class GetCoachByIdUseCase{
    constructor(
        private coachRepository: CoachRepository,
    ){}

    async execute({ id }: GetCoachByIdUseCaseRequest): Promise<GetCoachByIdUseCaseResponse>{
        const coach = await this.coachRepository.findById(id);

        if(!coach){
            throw new ResourceNotFoundError();
        }

        return { coach };
    }
}