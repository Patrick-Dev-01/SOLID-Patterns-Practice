import { ResourceNotFoundError } from "../../../app/errors/resource-not-found-error";
import { DeleteCoachUseCase } from "../../../app/use-cases/delete-coach";

export class DeleteCoachController{
    constructor(
        private deleteCoachUseCase: DeleteCoachUseCase 
    ){}

    async handle(id: string){
        try {
            await this.deleteCoachUseCase.execute({ id });
        } catch (err) {
            console.log(err);
            throw new ResourceNotFoundError();
        }
    }
}