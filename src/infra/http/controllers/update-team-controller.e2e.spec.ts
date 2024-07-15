import request from 'supertest';
import { app } from '../../../app';
import { TeamFactory } from '../../../../test/factories/make-team-factory';

describe("Update Team (e2e)", async () => {
    let teamFactory: TeamFactory;

    beforeAll(() => {
        teamFactory = new TeamFactory();
    })

    it("should Update football team", async () => {
        const team = await teamFactory.makeMySQLTeam({});

        const response = await request(app).put(`/football/team/${team.id}`).send({
            name: 'Palmeiras SE'
        }); 

        expect(response.status).toEqual(200);
        expect(response.body.team).toEqual(
            expect.objectContaining({ name: "Palmeiras SE" })
        );
    });

    it("should update salon football team", async () => {
        const team = await teamFactory.makePostgresTeam({});

        const response = await request(app).put(`/salon/team/${team.id}`).send({
            name: 'Santos FC'
        }); 

        expect(response.status).toEqual(200);
        expect(response.body.team).toEqual(
            expect.objectContaining({ name: "Santos FC" })
        );
    });
});