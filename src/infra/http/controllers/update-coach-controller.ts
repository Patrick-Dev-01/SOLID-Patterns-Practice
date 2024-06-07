import { UpdateCoachUseCase } from "../../../app/use-cases/update-coach";
import { z } from 'zod';

const updateCoachBodySchema = z.object({
    name: z.string().min(1, "Nome do Treinador obrigatório"),
    team_id: z.string().min(1, "Time Obrigatório"),
});

type UpdateCoachBodySchema = z.infer<typeof updateCoachBodySchema>;

export class UpdateCoachController{
    constructor(
        private updateCoachUseCase: UpdateCoachUseCase
    ){}

    async handle(id: string, body: UpdateCoachBodySchema){
        const { name, team_id } = updateCoachBodySchema.parse(body);

        try {
            const result = await this.updateCoachUseCase.execute({ id, name, team_id });

            return result;
        } 
        
        catch (err) {
            console.log(err);
        }
    }
}