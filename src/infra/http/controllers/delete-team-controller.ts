import { ResourceNotFoundError } from "../../../app/errors/resource-not-found-error";
import { DeleteTeamUseCase } from "../../../app/use-cases/delete-team";

export class DeleteTeamController{
    constructor(
        private deleteTeamUseCase: DeleteTeamUseCase 
    ){}

    async handle(id: string){
        try {
            await this.deleteTeamUseCase.execute({ id });
        } catch (err) {
            console.log(err);
            throw new ResourceNotFoundError();
        }
    }
}