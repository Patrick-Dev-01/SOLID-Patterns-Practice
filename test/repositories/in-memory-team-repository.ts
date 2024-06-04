import { Team } from "../../src/core/@types/team-types";
import { TeamRepository } from "../../src/core/repositories/team-repository";

export class InMemoryTeamRepository implements TeamRepository{
    public items: Team[] = [];

    async findById(id: string): Promise<Team | null> {
        const team = this.items.find(item => item.id === id);

        if(!team){
            return null
        }

        return team;
    }
    
    async fetchAll(){
        return this.items;
    }

    async create(team: Team): Promise<Team> {
       this.items.push(team);

       return team;
    }

    async update(team: Team): Promise<Team> {
        const itemIndex = this.items.findIndex(item => item.id === team.id);

        this.items[itemIndex] = team;

        return team;
    }
    
    async delete(team: Team): Promise<void> {
        const itemIndex = this.items.findIndex(item => item.id === team.id);

        this.items.splice(itemIndex, 1);
    }
}