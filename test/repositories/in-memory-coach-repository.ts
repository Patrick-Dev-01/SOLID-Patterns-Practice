import { Coach } from "../../src/core/@types/coach-types";
import { CoachRepository } from "../../src/core/repositories/coach-repository";

export class InMemoryCoachRepository implements CoachRepository{
    public items: Coach[] = [];
    
    async findById(id: string): Promise<Coach | null> {
        const coach = this.items.find(item => item.id === id);

        if(!coach){
            return null;
        }

        return coach;
    }

    async findMany(): Promise<Coach[]> {
        return this.items;
    }

    async create(coach: Coach): Promise<Coach> {
        this.items.push(coach);

        return coach;
    }

    async update(coach: Coach): Promise<Coach | null> {
        const itemIndex = this.items.findIndex(item => item.id === coach.id);

        if(!coach){
            return null;
        }

        this.items[itemIndex] = coach;

        return coach;
    }

    async delete(coach: Coach): Promise<void> {
        const itemIndex = this.items.findIndex(item => item.id === coach.id);
        
        this.items.splice(itemIndex, 1);
    }
}