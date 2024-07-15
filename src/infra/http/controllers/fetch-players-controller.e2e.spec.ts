import request from 'supertest';
import { app } from '../../../app';
import { PlayerFactory } from '../../../../test/factories/make-player-factory';
import { TeamFactory } from '../../../../test/factories/make-team-factory';

describe("Fetch Players (e2e)", async () => {
    let teamFactory: TeamFactory;
    let playerFactory: PlayerFactory;
    
    beforeAll(() => {
        teamFactory = new TeamFactory();
        playerFactory = new PlayerFactory();
    })

    it("should Fetch football players", async () => {
        await playerFactory.makeMySQLPlayer({})
        await playerFactory.makeMySQLPlayer({})

        const response = await request(app).get("/football/player").send();

        expect(response.body.players.length).toBeGreaterThan(0);
    });

    it("should Fetch salon players", async () => {
        const team = await teamFactory.makePostgresTeam({});
        await playerFactory.makePostgresPlayer({ team_id: team.id })
        await playerFactory.makePostgresPlayer({ team_id: team.id })

        const response = await request(app).get("/salon/player").send();
        
        expect(response.body.players.length).toBeGreaterThan(0);
    });
});