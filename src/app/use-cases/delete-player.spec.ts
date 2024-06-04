import { makePlayerFactory } from "../../../test/factories/make-player-factory";
import { InMemoryPlayerRepository } from "../../../test/repositories/in-memory-player-repository";
import { DeletePlayerUseCase } from "./delete-player";

let inMemoryPlayerRepository: InMemoryPlayerRepository;
let sut: DeletePlayerUseCase;

describe('Delete Player', () => {
    beforeAll(() => {
        inMemoryPlayerRepository = new InMemoryPlayerRepository();
        sut = new DeletePlayerUseCase(inMemoryPlayerRepository);
    })

    it('should be able to delete a player', async () => {
        await inMemoryPlayerRepository.create(makePlayerFactory({ id: '1' }));
        
        await sut.execute({ id: '1' });

        expect(inMemoryPlayerRepository.items).toHaveLength(0);
    });
});