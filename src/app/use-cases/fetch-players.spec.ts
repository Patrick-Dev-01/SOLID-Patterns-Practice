import { makePlayer } from "../../../test/factories/make-player-factory";
import { makeTeam } from "../../../test/factories/make-team-factory";
import { InMemoryPlayerRepository } from "../../../test/repositories/in-memory-player-repository";
import { InMemoryTeamRepository } from "../../../test/repositories/in-memory-team-repository";
import { FetchPlayersUseCase } from "./fetch-players";

let inMemoryTeamRepository: InMemoryTeamRepository;
let inMemoryPlayerRepository: InMemoryPlayerRepository;
let sut: FetchPlayersUseCase;

describe('Fetch Players', () => {
    beforeAll(() => {
        inMemoryTeamRepository = new InMemoryTeamRepository();
        inMemoryPlayerRepository = new InMemoryPlayerRepository();
        sut = new FetchPlayersUseCase(inMemoryPlayerRepository);
    })

    it('should be able to fetch all players', async () => {
        const team = await inMemoryTeamRepository.create(makeTeam({ name: 'team 1' }));

        for(let i = 0; i < 11; i++){
            inMemoryPlayerRepository.create(makePlayer({ team_id: team.id }))
        }

        expect(inMemoryPlayerRepository.items).toHaveLength(11);
    });
})