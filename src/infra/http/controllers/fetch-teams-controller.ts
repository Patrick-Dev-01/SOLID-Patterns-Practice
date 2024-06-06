import { ResourceNotFoundError } from "../../../app/errors/resource-not-found-error";
import { FetchTeamsUseCase } from "../../../app/use-cases/fetch-teams";

export class FetchTeamsController{
    constructor(
        private fetchTeamsUseCase: FetchTeamsUseCase,
    ){}

    async handle(){
        try {
            const result = await this.fetchTeamsUseCase.execute();
            return result;
        } 
        
        catch (err) {
            throw new ResourceNotFoundError();
        }
    }
}