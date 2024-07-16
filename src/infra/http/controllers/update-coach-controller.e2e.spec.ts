import request from 'supertest';
import { app } from '../../../app';
import { CoachFactory } from '../../../../test/factories/make-coach-factory';

describe("Update Coach (e2e)", async () => {
    let coachFactory: CoachFactory;

    beforeAll(() => {
        coachFactory = new CoachFactory();
    })

    it("should Update football coach", async () => {
        const coach = await coachFactory.makeMySQLCoach({});

        const response = await request(app).put(`/football/coach/${coach.id}`).send({
            name: 'New Name',
            team_id: '2'
        }); 

        expect(response.status).toEqual(200);
        expect(response.body.coach).toEqual(
            expect.objectContaining({ name: 'New Name', team_id: '2'})
        );
    });

    it("should Update salon coach", async () => {
        const coach = await coachFactory.makePostgresCoach({});

        const response = await request(app).put(`/salon/coach/${coach.id}`).send({
            name: 'New Name',
            team_id: '2'
        }); 

        expect(response.status).toEqual(200);
        expect(response.body.coach).toEqual(
            expect.objectContaining({ name: 'New Name', team_id: '2'})
        );
    });
});