import { ResourceNotFoundError } from "../../../app/errors/resource-not-found-error";
import { DeletePlayerUseCase } from "../../../app/use-cases/delete-player";

export class DeletePlayerController{
    constructor(
        private deletePlayerUseCase: DeletePlayerUseCase 
    ){}

    async handle(id: string){
        try {
            await this.deletePlayerUseCase.execute({ id });
        } catch (err) {
            console.log(err);
            throw new ResourceNotFoundError();
        }
    }
}