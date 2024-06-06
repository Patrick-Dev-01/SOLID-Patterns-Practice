import request from 'supertest';
import { app } from '../../../app';
import { makePlayer } from '../../../../test/factories/make-player-factory';

describe("Create Player (e2e)", async () => {
    it("should create a football player", async () => {
        const response = await request(app).post(`/football/player`).send(
            makePlayer({})
        );

        expect(response.status).toBe(201);
    });
});