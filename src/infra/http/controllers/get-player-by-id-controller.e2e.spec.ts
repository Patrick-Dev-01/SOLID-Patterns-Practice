import request from 'supertest';
import { app } from '../../../app';
import { PlayerFactory } from '../../../../test/factories/make-player-factory';

describe("Get Player by id (e2e)", async () => {
    let playerFactory: PlayerFactory;
    
    beforeAll(() => {
        playerFactory = new PlayerFactory();
    })

    it("Should get a football player by id", async () => {
        const player = await playerFactory.makeMySQLPlayer({});

        const response = await request(app).get(`/football/player/${player.id}`).send();

        expect(response.body.player).toEqual(
            expect.objectContaining({ id: player.id })
        );
    });
});