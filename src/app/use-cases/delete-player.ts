import { PlayerRepository } from "../../core/repositories/player-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeletePlayerUseCaseRequest{
    id: string;
}

export class DeletePlayerUseCase{
    constructor(
        private playerRepository: PlayerRepository
    ){}

    async execute({ id }: DeletePlayerUseCaseRequest): Promise<void>{
        const player = await this.playerRepository.findById(id);

        if(!player){
            throw new ResourceNotFoundError();
        }

        await this.playerRepository.delete(player);
    }
}