import { CreateCoachUseCase } from "../../../app/use-cases/create-coach";
import { z } from 'zod';

const createCoachBodySchema = z.object({
    name: z.string().min(1, "Nome do treinador obrigatório"),
    team_id: z.string(),
});

type CreateCoachBodySchema = z.infer<typeof createCoachBodySchema>;

export class CreateCoachController{
    constructor(
        private createCoachUseCase: CreateCoachUseCase
    ){}

    async handle(body: CreateCoachBodySchema){
        const { name, team_id } = createCoachBodySchema.parse(body);

        try {
            const result = await this.createCoachUseCase.execute({ name, team_id });

            return result;
        } 
        
        catch (err) {
            console.log(err);
        }
    }
}