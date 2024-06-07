import { ResourceNotFoundError } from "../../../app/errors/resource-not-found-error";
import { GetCoachByIdUseCase } from "../../../app/use-cases/get-coach-by-id";

export class GetCoachByIdController{
    constructor(
        private getCoachByIdUseCase: GetCoachByIdUseCase
    ){}

    async handle(id: string){
        try {
            const result = await this.getCoachByIdUseCase.execute({ id });
            
            return result;
        } catch (err) {
            throw new ResourceNotFoundError();
        }
    }
}