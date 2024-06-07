import { makeCoach } from "../../../test/factories/make-coach-factory";
import { InMemoryCoachRepository } from "../../../test/repositories/in-memory-coach-repository";
import { DeleteCoachUseCase } from "./delete-coach";

let inMemoryCoachRepository: InMemoryCoachRepository;
let sut: DeleteCoachUseCase;

describe('Delete Coach', () => {
    beforeAll(() => {
        inMemoryCoachRepository = new InMemoryCoachRepository();
        sut = new DeleteCoachUseCase(inMemoryCoachRepository);
    })

    it('should be able to delete coach', async () => {
        await inMemoryCoachRepository.create(makeCoach({ id: '1' }));

        await sut.execute({ id: '1'});

        expect(inMemoryCoachRepository.items).toHaveLength(0);
    });
})