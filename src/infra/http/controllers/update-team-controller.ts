import { UpdateTeamUseCase } from "../../../app/use-cases/update-team";
import { z } from 'zod';

const updateTeamBodySchema = z.object({
    name: z.string().min(1, "Nome do time obrigatório"),
});

type UpdateTeamBodySchema = z.infer<typeof updateTeamBodySchema>;

export class UpdateTeamController{
    constructor(
        private updateTeamUseCase: UpdateTeamUseCase
    ){}

    async handle(id: string, body: UpdateTeamBodySchema){
        const { name } = updateTeamBodySchema.parse(body);

        try {
            const result = await this.updateTeamUseCase.execute({ id, name });

            return result;
        } 
        
        catch (err) {
            console.log(err);
        }
    }
}