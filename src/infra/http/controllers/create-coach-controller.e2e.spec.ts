import request from 'supertest';
import { app } from '../../../app';
import { makeCoach } from '../../../../test/factories/make-coach-factory';

describe("Create Coach (e2e)", async () => {
    it("should create a coach", async () => {
        const response = await request(app).post(`/football/coach`).send(
            makeCoach({})
        );

        expect(response.status).toBe(201);
    });
});