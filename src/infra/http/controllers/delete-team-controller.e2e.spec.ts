import request from 'supertest';
import { app } from '../../../app';
import { TeamFactory } from '../../../../test/factories/make-team-factory';

describe("Delete Team (e2e)", async () => {
    let teamFactory: TeamFactory;

    beforeAll(() => {
        teamFactory = new TeamFactory();
    })

    it("should Delete a football team", async () => {
        const team = await teamFactory.makeMySQLTeam({});

        const response = await request(app).delete(`/football/team/${team.id}`).send(); 

        expect(response.status).toEqual(204);
    });
});