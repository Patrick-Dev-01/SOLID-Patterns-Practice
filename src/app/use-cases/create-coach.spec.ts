import { makeTeamFactory } from "../../../test/factories/make-team-factory";
import { InMemoryCoachRepository } from "../../../test/repositories/in-memory-coach-repository";
import { CreateCoachUseCase } from "./create-coach";

let inMemoryCoachRepository: InMemoryCoachRepository;
let sut: CreateCoachUseCase;

describe("Create Coach", () => {
    beforeAll(() => {
        inMemoryCoachRepository = new InMemoryCoachRepository();
        sut = new CreateCoachUseCase(inMemoryCoachRepository);
    })

    it('should be able create a coach', async () => {
        const team = makeTeamFactory({});

        const response = await sut.execute({
            name: 'coach test',
            team_id: team.id 
        }); 

        expect(response.coach).toEqual(
            expect.objectContaining({ name: 'coach test', team_id: team.id })
        );
    });
})