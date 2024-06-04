import { makeTeamFactory } from "../../../test/factories/make-team-factory";
import { InMemoryTeamRepository } from "../../../test/repositories/in-memory-team-repository";
import { FetchTeamsUseCase } from "./fetch-teams";

let inMemoryTeamRepository: InMemoryTeamRepository;
let sut: FetchTeamsUseCase;

describe('Fetch Teams', () => {
    beforeAll(() => {
        inMemoryTeamRepository = new InMemoryTeamRepository();
        sut = new FetchTeamsUseCase(inMemoryTeamRepository);
    })

    it('should be able to fetch all teams', async () => {
        inMemoryTeamRepository.create(makeTeamFactory({ id: '1', name: 'team 1' }));
        inMemoryTeamRepository.create(makeTeamFactory({ id: '2', name: 'team 2' }));
        inMemoryTeamRepository.create(makeTeamFactory({ id: '3', name: 'team 3' }));

        const response = await sut.execute();

        expect(response.teams).toHaveLength(3);

        expect(response.teams).toEqual([
            expect.objectContaining({ name: 'team 1' }),
            expect.objectContaining({ name: 'team 2' }),
            expect.objectContaining({ name: 'team 3' })
        ]);
    });
})