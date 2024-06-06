import request from 'supertest';
import { app } from '../../../app';
import { PlayerFactory } from '../../../../test/factories/make-player-factory';

describe("Fetch Players (e2e)", async () => {
    let playerFactory: PlayerFactory;
    
    beforeAll(() => {
        playerFactory = new PlayerFactory();
    })

    it("should Fetch football players", async () => {
        await playerFactory.makeMySQLPlayer({})
        await playerFactory.makeMySQLPlayer({})

        const response = await request(app).get("/football/player").send();

        expect(response.body.players.length).toBeGreaterThan(0);
    });
});