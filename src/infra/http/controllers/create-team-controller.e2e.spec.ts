import request from 'supertest';
import { app } from '../../../app';
import { makeTeam } from '../../../../test/factories/make-team-factory';

describe("Create Team (e2e)", async () => {
    it("should create a football team", async () => {
        const response = await request(app).post(`/football/team`).send(
            makeTeam({})
        );

        expect(response.status).toBe(201);
    });
});
