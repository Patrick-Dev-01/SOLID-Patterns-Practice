import request from 'supertest';
import { app } from '../../../app';
import { PlayerFactory } from '../../../../test/factories/make-player-factory';

describe("Update Player (e2e)", async () => {
    let playerFactory: PlayerFactory;

    beforeAll(() => {
        playerFactory = new PlayerFactory();
    })

    it("Should Update football player", async () => {
        const player = await playerFactory.makeMySQLPlayer({ position: 'atacante', starter: false });

        const response = await request(app).put(`/football/player/${player.id}`).send({
            name: player.name,
            shirt_number: player.shirt_number,
            position: 'meio campo',
            starter: true,
            team_id: player.team_id
        }); 

        expect(response.status).toEqual(200);
        expect(response.body.player).toEqual(
            expect.objectContaining({ position: 'meio campo', starter: true })
        );
    });
});