import { Player } from "../../core/types/player-types";
import { PlayerRepository } from "../../core/repositories/player-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface UpdatePlayerUseCaseRequest{
    id: string;
    name: string;
    shirt_number: number;
    position: string;
    starter: boolean;
    team_id: string;
}

interface UpdatePlayerUseCaseResponse{
    player: Player;
}

export class UpdatePlayerUseCase{
    constructor(
        private playerRepository: PlayerRepository
    ){}

    async execute({ id, name, shirt_number, position, starter, team_id }: UpdatePlayerUseCaseRequest): Promise<UpdatePlayerUseCaseResponse>{
        const player = await this.playerRepository.findById(id);

        if(!player){
            throw new ResourceNotFoundError();
        }

        player.name = name;
        player.shirt_number = shirt_number;
        player.position = position;
        player.starter = starter;
        player.team_id = team_id;

        await this.playerRepository.update(player);

        return { player }
    }
}