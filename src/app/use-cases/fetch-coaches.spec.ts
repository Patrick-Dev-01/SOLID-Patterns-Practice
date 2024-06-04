import { makeCoachFactory } from "../../../test/factories/make-coach-factory";
import { InMemoryCoachRepository } from "../../../test/repositories/in-memory-coach-repository";
import { FetchCoachesUseCase } from "./fetch-coaches";
import { FetchTeamsUseCase } from "./fetch-teams";

let inMemoryCoachRepository: InMemoryCoachRepository;
let sut: FetchCoachesUseCase;

describe('Fetch Coaches', () => {
    beforeAll(() => {
        inMemoryCoachRepository = new InMemoryCoachRepository();
        sut = new FetchCoachesUseCase(inMemoryCoachRepository);
    })

    it('should be able to fetch all coaches', async () => {
        inMemoryCoachRepository.create(makeCoachFactory({ id: '1', name: 'coach 1' }));
        inMemoryCoachRepository.create(makeCoachFactory({ id: '2', name: 'coach 2' }));
        inMemoryCoachRepository.create(makeCoachFactory({ id: '3', name: 'coach 3' }));

        const response = await sut.execute();

        expect(response.coach).toHaveLength(3);
        expect(response.coach).toEqual([
            expect.objectContaining({ name: 'coach 1' }),
            expect.objectContaining({ name: 'coach 2' }),
            expect.objectContaining({ name: 'coach 3' })
        ]);
    });
})