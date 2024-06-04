import { makeCoachFactory } from "../../../test/factories/make-coach-factory";
import { InMemoryCoachRepository } from "../../../test/repositories/in-memory-coach-repository";
import { GetCoachByIdUseCase } from "./get-coach-by-id";

let inMemoryCoachRepository: InMemoryCoachRepository;
let sut: GetCoachByIdUseCase;

describe('Get Coach by Id', () => {
    beforeAll(() => {
        inMemoryCoachRepository = new InMemoryCoachRepository();
        sut = new GetCoachByIdUseCase(inMemoryCoachRepository);
    })

    it('should be able to get a Coach by id', async () => {
        const coach = await inMemoryCoachRepository.create(makeCoachFactory({ id: '1' }))
        
        const response = await sut.execute({
            id: coach.id,
        });

        expect(response.coach).toEqual(
            expect.objectContaining({ id: coach.id })
        );
    });
})