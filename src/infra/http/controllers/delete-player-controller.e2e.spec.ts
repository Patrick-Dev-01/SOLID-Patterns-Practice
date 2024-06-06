import request from 'supertest';
import { app } from '../../../app';
import { PlayerFactory } from '../../../../test/factories/make-player-factory';

describe("Delete Team (e2e)", async () => {
    let playerFactory: PlayerFactory;

    beforeAll(() => {
        playerFactory = new PlayerFactory();
    })

    it("should Delete a football player", async () => {
        const player = await playerFactory.makeMySQLPlayer({});

        const response = await request(app).delete(`/football/player/${player.id}`).send(); 

        expect(response.status).toEqual(204);
    });
});