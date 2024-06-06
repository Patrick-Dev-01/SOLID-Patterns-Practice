import { ResourceNotFoundError } from "../../../app/errors/resource-not-found-error";
import { GetTeamByIdUseCase } from "../../../app/use-cases/get-team-by-id";

export class GetTeamByIdController{
    constructor(
        private getTeamByIdUseCase: GetTeamByIdUseCase
    ){}

    async handle(id: string){
        try {
            const result = await this.getTeamByIdUseCase.execute({ id });
            
            return result;
        } catch (err) {
            throw new ResourceNotFoundError();
        }
    }
}