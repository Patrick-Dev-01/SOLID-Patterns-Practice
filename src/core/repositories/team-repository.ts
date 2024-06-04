import { Team } from "../@types/team-types";

export interface TeamRepository{
    findById(id: string): Promise<Team | null>;
    fetchAll(): Promise<Team[]>;
    create(team: Team): Promise<Team>;
    update(team: Team): Promise<Team | null>;
    delete(team: Team): Promise<void>;
}