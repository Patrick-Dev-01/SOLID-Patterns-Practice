import { Player } from "../types/player-types";

export interface PlayerRepository{
    findMany(): Promise<Player[] | null>;
    findManyByTeam(id: string): Promise<Player[] | null>;
    findById(id: string): Promise<Player | null>; 
    create(player: Player): Promise<Player>;
    update(player: Player): Promise<Player | null>;
    delete(player: Player): Promise<void>;
}