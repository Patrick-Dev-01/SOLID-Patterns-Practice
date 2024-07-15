import request from 'supertest';
import { app } from '../../../app';
import { makePlayer } from '../../../../test/factories/make-player-factory';
import { TeamFactory } from '../../../../test/factories/make-team-factory';

describe("Create Player (e2e)", async () => {
    let teamFactory: TeamFactory;

    beforeAll(() => {
        teamFactory = new TeamFactory();
    })

    it("should create a football player", async () => {
        const response = await request(app).post(`/football/player`).send(
            makePlayer({})
        );

        expect(response.status).toBe(201);
    });

    it("should create a salon football player", async () => {
        const team = await teamFactory.makePostgresTeam({})
        const response = await request(app).post(`/salon/player`).send(
            makePlayer({
                team_id: team.id
            })
        );

        expect(response.status).toBe(201);
    });
});