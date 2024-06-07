import request from 'supertest';
import { app } from '../../../app';
import { CoachFactory } from '../../../../test/factories/make-coach-factory';

describe("Delete Coach (e2e)", async () => {
    let coachFactory: CoachFactory;

    beforeAll(() => {
        coachFactory = new CoachFactory();
    })

    it("should Delete a football coach", async () => {
        const coach = await coachFactory.makeMySQLCoach({});

        const response = await request(app).delete(`/football/coach/${coach.id}`).send(); 

        expect(response.status).toEqual(204);
    });
});