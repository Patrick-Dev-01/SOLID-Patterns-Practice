import { Player } from "../../core/types/player-types";
import { PlayerRepository } from "../../core/repositories/player-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface FetchPlayersUseCaseResponse{
    players: Player[];
}

export class FetchPlayersUseCase{
    constructor(
        private playerRepository: PlayerRepository,
    ){}

    async execute(): Promise<FetchPlayersUseCaseResponse>{
        const players = await this.playerRepository.findMany();

        if(!players){
            throw new ResourceNotFoundError();
        }

        return { players }
    }
}