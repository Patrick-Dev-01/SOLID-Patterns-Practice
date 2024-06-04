import { makeTeamFactory } from "../../../test/factories/make-team-factory";
import { InMemoryTeamRepository } from "../../../test/repositories/in-memory-team-repository";
import { GetTeamByIdUseCase } from "./get-team-by-id";

let inMemoryTeamRepository: InMemoryTeamRepository;
let sut: GetTeamByIdUseCase;

describe('Get Team by Id', () => {
    beforeAll(() => {
        inMemoryTeamRepository = new InMemoryTeamRepository();
        sut = new GetTeamByIdUseCase(inMemoryTeamRepository);
    })

    it('should be able to get a team by id', async () => {
        const team = makeTeamFactory({ id: '1', name: 'team 1' });

        inMemoryTeamRepository.create(team);

        const response = await sut.execute({
            id: team.id,
        });

        expect(response.team).toEqual(
            expect.objectContaining({ name: 'team 1'})
        );
    });
})