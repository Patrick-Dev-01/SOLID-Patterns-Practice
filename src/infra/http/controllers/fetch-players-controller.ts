import { ResourceNotFoundError } from "../../../app/errors/resource-not-found-error";
import { FetchPlayersUseCase } from "../../../app/use-cases/fetch-players";

export class FetchPlayersController{
    constructor(
        private fetchPlayersUseCase: FetchPlayersUseCase,
    ){}

    async handle(){
        try {
            const result = await this.fetchPlayersUseCase.execute();
            return result;
        } 
        
        catch (err) {
            throw new ResourceNotFoundError();
        }
    }
}