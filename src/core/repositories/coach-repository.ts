import { Coach } from "../types/coach-types";

export interface CoachRepository{
    findById(id: string): Promise<Coach | null>;
    findMany(): Promise<Coach[]>
    create(coach: Coach): Promise<Coach>;
    update(coach: Coach): Promise<Coach | null>;
    delete(coach: Coach): Promise<void>;
}