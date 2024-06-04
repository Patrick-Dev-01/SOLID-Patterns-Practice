import { makePlayerFactory } from "../../../test/factories/make-player-factory";
import { InMemoryPlayerRepository } from "../../../test/repositories/in-memory-player-repository";
import { UpdatePlayerUseCase } from "./update-player";

let inMemoryPlayerRepository: InMemoryPlayerRepository;
let sut: UpdatePlayerUseCase;

describe('Update Player', () => {
    beforeAll(() => {
        inMemoryPlayerRepository = new InMemoryPlayerRepository();
        sut = new UpdatePlayerUseCase(inMemoryPlayerRepository);
    })

    it('should be able to update player', async () => {
        const player = await inMemoryPlayerRepository.create(makePlayerFactory({ id: '1' }));
        
        const response = await sut.execute({
            id: player.id,
            name: 'new player name',
            position: player.position,
            shirt_number: player.shirt_number,
            starter: player.starter,
            team_id: player.team_id
        });

        expect(response.player).toEqual(
            expect.objectContaining({ name: 'new player name'})
        );
    });
})