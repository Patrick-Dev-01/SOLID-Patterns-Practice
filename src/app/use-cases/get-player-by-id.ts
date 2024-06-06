import { Player } from "../../core/types/player-types";
import { PlayerRepository } from "../../core/repositories/player-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetPlayerByIdUseCaseRequest{
    id: string;
}

interface GetPlayerByIdUseCaseResponse{
    player: Player;
}

export class GetPlayerByIdUseCase{
    constructor(
        private playerRepository: PlayerRepository,
    ){}

    async execute({ id }: GetPlayerByIdUseCaseRequest): Promise<GetPlayerByIdUseCaseResponse>{
        const player = await this.playerRepository.findById(id);

        if(!player){
            throw new ResourceNotFoundError();
        }

        return { player };
    }
}