import request from 'supertest';
import { app } from '../../../app';
import { CoachFactory } from '../../../../test/factories/make-coach-factory';

describe("Fetch Coachs (e2e)", async () => {
    let coachFactory: CoachFactory;
    
    beforeAll(() => {
        coachFactory = new CoachFactory();
    })

    it("should Fetch football coachs", async () => {
        await coachFactory.makeMySQLCoach({});
        await coachFactory.makeMySQLCoach({});

        const response = await request(app).get("/football/coach").send();

        expect(response.body.coachs.length).toBeGreaterThan(0);
    });
});