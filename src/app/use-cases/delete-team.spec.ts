import { makeTeamFactory } from "../../../test/factories/make-team-factory";
import { InMemoryTeamRepository } from "../../../test/repositories/in-memory-team-repository";
import { DeleteTeamUseCase } from "./delete-team";

let inMemoryTeamRepository: InMemoryTeamRepository;
let sut: DeleteTeamUseCase;

describe('Delete Team', () => {
    beforeAll(() => {
        inMemoryTeamRepository = new InMemoryTeamRepository();
        sut = new DeleteTeamUseCase(inMemoryTeamRepository);
    })

    it('should be able to delete team', async () => {
        const team = makeTeamFactory({ id: '1', name: 'team 1' });

        inMemoryTeamRepository.create(team);

        await sut.execute(team);

        expect(inMemoryTeamRepository.items).toHaveLength(0);
    });
})