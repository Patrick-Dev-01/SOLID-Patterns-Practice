import { Player } from "../../core/@types/player-types";
import { PlayerRepository } from "../../core/repositories/player-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface FetchPlayersUseCaseRequest{
    id: string;
}

interface FetchPlayersUseCaseResponse{
    players: Player[];
}

export class FetchPlayersUseCase{
    constructor(
        private playerRepository: PlayerRepository,
    ){}

    async execute({ id }: FetchPlayersUseCaseRequest): Promise<FetchPlayersUseCaseResponse>{
        const players = await this.playerRepository.findManyByTeam(id);

        if(!players){
            throw new ResourceNotFoundError();
        }

        return { players }
    }
}