import request from 'supertest';
import { app } from '../../../app';
import { TeamFactory } from '../../../../test/factories/make-team-factory';

describe("Get Team by id (e2e)", async () => {
    let teamFactory: TeamFactory;
    
    beforeAll(() => {
        teamFactory = new TeamFactory();
    })

    it("Should get a football team by id", async () => {
        const team = await teamFactory.makeMySQLTeam({});

        const response = await request(app).get(`/football/team/${team.id}`).send();

        expect(response.body.team).toEqual(
            expect.objectContaining({ id: team.id })
        );
    });
});