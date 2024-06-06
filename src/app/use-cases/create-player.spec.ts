import { makeTeam } from "../../../test/factories/make-team-factory";
import { InMemoryPlayerRepository } from "../../../test/repositories/in-memory-player-repository";
import { CreatePlayerUseCase } from "./create-player";

let inMemoryPlayerRepository: InMemoryPlayerRepository;
let sut: CreatePlayerUseCase;

describe("Create Player", () => {
    beforeAll(() => {
        inMemoryPlayerRepository = new InMemoryPlayerRepository();
        sut = new CreatePlayerUseCase(inMemoryPlayerRepository);
    })

    it('should be able create a player', async () => {
        const team = makeTeam({});

        const response = await sut.execute({
            name: 'player test', 
            position: 'atacante',
            shirt_number: 10,
            starter: true,
            team_id: team.id
        }); 

        expect(response.player).toEqual(
            expect.objectContaining({ name: 'player test', team_id: team.id })
        );
    });
})