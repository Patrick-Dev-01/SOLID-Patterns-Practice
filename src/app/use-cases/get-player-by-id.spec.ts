import { makePlayerFactory } from "../../../test/factories/make-player-factory";
import { InMemoryPlayerRepository } from "../../../test/repositories/in-memory-player-repository";
import { GetPlayerByIdUseCase } from "./get-player-by-id";

let inMemoryPlayerRepository: InMemoryPlayerRepository;
let sut: GetPlayerByIdUseCase;

describe('Get Player by Id', () => {
    beforeAll(() => {
        inMemoryPlayerRepository = new InMemoryPlayerRepository();
        sut = new GetPlayerByIdUseCase(inMemoryPlayerRepository);
    })

    it('should be able to get a Player by id', async () => {
        const player = await inMemoryPlayerRepository.create(makePlayerFactory({ id: '1' }))
        
        const response = await sut.execute({
            id: player.id,
        });

        expect(response.player).toEqual(
            expect.objectContaining({ id: player.id })
        );
    });
})