import { array } from "zod";
import { makePlayerFactory } from "../../../test/factories/make-player-factory";
import { makeTeamFactory } from "../../../test/factories/make-team-factory";
import { InMemoryPlayerRepository } from "../../../test/repositories/in-memory-player-repository";
import { InMemoryTeamRepository } from "../../../test/repositories/in-memory-team-repository";
import { FetchPlayersUseCase } from "./fetch-players";

let inMemoryTeamRepository: InMemoryTeamRepository;
let inMemoryPlayerRepository: InMemoryPlayerRepository;
let sut: FetchPlayersUseCase;

describe('Fetch Players by Team', () => {
    beforeAll(() => {
        inMemoryTeamRepository = new InMemoryTeamRepository();
        inMemoryPlayerRepository = new InMemoryPlayerRepository();
        sut = new FetchPlayersUseCase(inMemoryPlayerRepository);
    })

    it('should be able to fetch all players from a team', async () => {
        const team = await inMemoryTeamRepository.create(makeTeamFactory({ name: 'team 1' }));

        for(let i = 0; i < 11; i++){
            inMemoryPlayerRepository.create(makePlayerFactory({ team_id: team.id }))
        }

        const response = await sut.execute({ 
            id: team.id
        });

        expect(response.players).toHaveLength(11);
        expect(response.players).toEqual(expect.arrayContaining([
            expect.objectContaining({ team_id: team.id }),
        ]));
    });
})