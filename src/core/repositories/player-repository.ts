import { Player } from "../@types/player-types";

export interface PlayerRepository{
    findManyByTeam(id: string): Promise<Player[] | null>;
    findById(id: string): Promise<Player | null>; 
    create(player: Player): Promise<Player>;
    update(player: Player): Promise<Player | null>;
    delete(player: Player): Promise<void>;
}