import { CreatePlayerUseCase } from "../../../app/use-cases/create-player";
import { z } from 'zod';

const createPlayerBodySchema = z.object({
    name: z.string().min(1, "Nome do time obrigatório"),
    shirt_number: z.number(),
    position: z.string(),
    starter: z.boolean(),
    team_id: z.string()
});

type CreatePlayerBodySchema = z.infer<typeof createPlayerBodySchema>;

export class CreatePlayerController{
    constructor(
        private createPlayerUseCase: CreatePlayerUseCase
    ){}

    async handle(body: CreatePlayerBodySchema){
        const { name, shirt_number, position, starter, team_id } = createPlayerBodySchema.parse(body);

        try {
            const result = await this.createPlayerUseCase.execute({ name, shirt_number, position, starter, team_id });

            return result;
        } 
        
        catch (err) {
            console.log(err);
        }
    }
}