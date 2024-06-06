import { makePlayer } from "../../../test/factories/make-player-factory";
import { InMemoryCoachRepository } from "../../../test/repositories/in-memory-coach-repository";
import { UpdateCoachUseCase } from "./update-coach";

let inMemoryCoachRepository: InMemoryCoachRepository;
let sut: UpdateCoachUseCase;

describe('Update Coach', () => {
    beforeAll(() => {
        inMemoryCoachRepository = new InMemoryCoachRepository();
        sut = new UpdateCoachUseCase(inMemoryCoachRepository);
    })

    it('should be able to update coach', async () => {
        const player = await inMemoryCoachRepository.create(makePlayer({ id: '1' }));
        
        const response = await sut.execute({
            id: player.id,
            name: 'new coach name',
            team_id: player.team_id
        });

        expect(response.coach).toEqual(
            expect.objectContaining({ name: 'new coach name'})
        );
    });
})