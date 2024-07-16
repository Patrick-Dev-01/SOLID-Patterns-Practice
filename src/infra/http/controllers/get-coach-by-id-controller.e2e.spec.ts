import request from 'supertest';
import { app } from '../../../app';
import { CoachFactory } from '../../../../test/factories/make-coach-factory';

describe("Get Coach by id (e2e)", async () => {
    let coachFactory: CoachFactory;
    
    beforeAll(() => {
        coachFactory = new CoachFactory();
    })

    it("Should get a Coach by id", async () => {
        const coach = await coachFactory.makeMySQLCoach({});

        const response = await request(app).get(`/football/coach/${coach.id}`).send();

        expect(response.body.coach).toEqual(
            expect.objectContaining({ id: coach.id })
        );
    });

    it("Should get a salon Coach by id", async () => {
        const coach = await coachFactory.makePostgresCoach({});

        const response = await request(app).get(`/salon/coach/${coach.id}`).send();

        expect(response.body.coach).toEqual(
            expect.objectContaining({ id: coach.id })
        );
    });
});