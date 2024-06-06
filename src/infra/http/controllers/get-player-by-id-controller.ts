import { ResourceNotFoundError } from "../../../app/errors/resource-not-found-error";
import { GetPlayerByIdUseCase } from "../../../app/use-cases/get-player-by-id";

export class GetPlayerByIdController{
    constructor(
        private getPlayerByIdUseCase: GetPlayerByIdUseCase
    ){}

    async handle(id: string){
        try {
            const result = await this.getPlayerByIdUseCase.execute({ id });
            
            return result;
        } catch (err) {
            throw new ResourceNotFoundError();
        }
    }
}