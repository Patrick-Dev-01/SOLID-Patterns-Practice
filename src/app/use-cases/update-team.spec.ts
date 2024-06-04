import { makeTeamFactory } from "../../../test/factories/make-team-factory";
import { InMemoryTeamRepository } from "../../../test/repositories/in-memory-team-repository";
import { UpdateTeamUseCase } from "./update-team";

let inMemoryTeamRepository: InMemoryTeamRepository;
let sut: UpdateTeamUseCase;

describe('Update Team', () => {
    beforeAll(() => {
        inMemoryTeamRepository = new InMemoryTeamRepository();
        sut = new UpdateTeamUseCase(inMemoryTeamRepository);
    })

    it('should be able to update team', async () => {
        const team = makeTeamFactory({ id: '1', name: 'team 1' });

        inMemoryTeamRepository.create(team);

        const response = await sut.execute({
            id: team.id,
            name: 'new team name 1'
        });

        expect(response.team).toEqual(
            expect.objectContaining({ name: 'new team name 1'})
        );
    });
})