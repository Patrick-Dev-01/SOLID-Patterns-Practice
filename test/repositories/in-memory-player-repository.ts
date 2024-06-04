import { Player } from "../../src/core/@types/player-types";
import { PlayerRepository } from "../../src/core/repositories/player-repository";

export class InMemoryPlayerRepository implements PlayerRepository{
    public items: Player[] = [];

    async findManyByTeam(id: string): Promise<Player[] | null> {
        const players = this.items.filter(item => item.team_id === id);

        return players;
    }

    async findById(id: string): Promise<Player | null> {
        const player = this.items.find(item => item.id === id);

        if(!player){
            return null;
        }

        return player;
    }

    async create(player: Player): Promise<Player> {
        this.items.push(player);    

        return player;
    }

    async update(player: Player): Promise<Player | null> {
        const itemIndex = this.items.findIndex(item => item.id === player.id);

        this.items[itemIndex] = player;

        return player;
    }

    async delete(player: Player): Promise<void> {
        const itemIndex = this.items.findIndex(item => item.id === player.id);

        this.items.splice(itemIndex, 1);
    }
}