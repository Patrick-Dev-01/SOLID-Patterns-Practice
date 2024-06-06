import request from 'supertest';
import { app } from '../../../app';
import { TeamFactory } from '../../../../test/factories/make-team-factory';

describe("Fetch Teams (e2e)", async () => {
    let teamFactory: TeamFactory;
    
    beforeAll(() => {
        teamFactory = new TeamFactory();
    })

    it("should Fetch football teams", async () => {
        await teamFactory.makeMySQLTeam({})
        await teamFactory.makeMySQLTeam({})

        const response = await request(app).get("/football/team").send();

        expect(response.body.teams.length).toBeGreaterThan(0);
    });
});