import { UpdatePlayerUseCase } from "../../../app/use-cases/update-player";
import { z } from 'zod';

const updatePlayerBodySchema = z.object({
    name: z.string().min(1, "Nome do Jogador obrigatório"),
    shirt_number: z.number(),
    position: z.string(),
    starter: z.boolean(),
    team_id: z.string()
});

type UpdatePlayerBodySchema = z.infer<typeof updatePlayerBodySchema>;

export class UpdatePlayerController{
    constructor(
        private updatePlayerUseCase: UpdatePlayerUseCase
    ){}

    async handle(id: string, body: UpdatePlayerBodySchema){
        const { name, shirt_number, position, starter, team_id } = updatePlayerBodySchema.parse(body);

        try {
            const result = await this.updatePlayerUseCase.execute({ id, name, shirt_number, position, starter, team_id });

            return result;
        } 
        
        catch (err) {
            console.log(err);
        }
    }
}