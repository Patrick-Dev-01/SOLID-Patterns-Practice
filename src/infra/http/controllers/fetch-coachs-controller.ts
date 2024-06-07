import { ResourceNotFoundError } from "../../../app/errors/resource-not-found-error";
import { FetchCoachsUseCase } from "../../../app/use-cases/fetch-coachs";

export class FetchCoachsController{
    constructor(
        private fetchCoachsUseCase: FetchCoachsUseCase,
    ){}

    async handle(){
        try {
            const result = await this.fetchCoachsUseCase.execute();
            return result;
        } 
        
        catch (err) {
            throw new ResourceNotFoundError();
        }
    }
}