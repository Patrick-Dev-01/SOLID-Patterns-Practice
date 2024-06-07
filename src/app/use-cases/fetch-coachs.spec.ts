import { makeCoach } from "../../../test/factories/make-coach-factory";
import { InMemoryCoachRepository } from "../../../test/repositories/in-memory-coach-repository";
import { FetchCoachsUseCase } from "./fetch-coachs";
import { FetchTeamsUseCase } from "./fetch-teams";

let inMemoryCoachRepository: InMemoryCoachRepository;
let sut: FetchCoachsUseCase;

describe('Fetch Coaches', () => {
    beforeAll(() => {
        inMemoryCoachRepository = new InMemoryCoachRepository();
        sut = new FetchCoachsUseCase(inMemoryCoachRepository);
    })

    it('should be able to fetch all coaches', async () => {
        inMemoryCoachRepository.create(makeCoach({ id: '1', name: 'coach 1' }));
        inMemoryCoachRepository.create(makeCoach({ id: '2', name: 'coach 2' }));
        inMemoryCoachRepository.create(makeCoach({ id: '3', name: 'coach 3' }));

        const response = await sut.execute();

        expect(response.coachs).toHaveLength(3);
        expect(response.coachs).toEqual([
            expect.objectContaining({ name: 'coach 1' }),
            expect.objectContaining({ name: 'coach 2' }),
            expect.objectContaining({ name: 'coach 3' })
        ]);
    });
})