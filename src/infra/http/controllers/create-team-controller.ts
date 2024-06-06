import { CreateTeamUseCase } from "../../../app/use-cases/create-team";
import { z } from 'zod';

const createTeamBodySchema = z.object({
    name: z.string().min(1, "Nome do time obrigatório"),
});

type CreateTeamBodySchema = z.infer<typeof createTeamBodySchema>;

export class CreateTeamController{
    constructor(
        private createTeamUseCase: CreateTeamUseCase
    ){}

    async handle(body: CreateTeamBodySchema){
        const { name } = createTeamBodySchema.parse(body);

        try {
            const result = await this.createTeamUseCase.execute({ name });

            return result.team;
        } 
        
        catch (err) {
            console.log(err);
        }
    }
}