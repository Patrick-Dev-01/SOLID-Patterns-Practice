import { Player } from "../../core/@types/player-types";
import { PlayerRepository } from "../../core/repositories/player-repository";
import { randomUUID } from 'node:crypto';

interface CreatePlayerUseCaseRequest{
    name: string;
    shirt_number: number;
    position: string;
    starter: boolean;
    team_id: string;
}

interface CreatePlayerUseCaseResponse{
    player: Player;
}

export class CreatePlayerUseCase{
    constructor(
        private playerRepository: PlayerRepository
    ){}

    async execute({ name, shirt_number, position, starter, team_id }: CreatePlayerUseCaseRequest): Promise<CreatePlayerUseCaseResponse>{
        const player = { 
            id: randomUUID(),
            name,
            shirt_number,
            position,
            starter,
            team_id,
        }

        await this.playerRepository.create(player);

        return { player }
    }
}