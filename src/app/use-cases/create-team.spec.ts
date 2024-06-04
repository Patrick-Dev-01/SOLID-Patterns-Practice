import { InMemoryTeamRepository } from "../../../test/repositories/in-memory-team-repository";
import { CreateTeamUseCase } from "./create-team";

let inMemoryTeamRepository: InMemoryTeamRepository;
let sut: CreateTeamUseCase;

describe('Create Team', () => {
    beforeAll(() => {
        inMemoryTeamRepository = new InMemoryTeamRepository();
        sut = new CreateTeamUseCase(inMemoryTeamRepository);
    })

    it('should be able create team', async () => {
        const response = await sut.execute({
            name: 'team name'
        }); 

        expect(response.team).toEqual(
            expect.objectContaining({ name: 'team name' })
        );
    });
})