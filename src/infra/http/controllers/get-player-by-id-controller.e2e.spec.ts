import request from 'supertest';
import { app } from '../../../app';
import { PlayerFactory } from '../../../../test/factories/make-player-factory';
import { TeamFactory } from '../../../../test/factories/make-team-factory';

describe("Get Player by id (e2e)", async () => {
    let teamFactory: TeamFactory;
    let playerFactory: PlayerFactory;
    
    beforeAll(() => {
        teamFactory = new TeamFactory();
        playerFactory = new PlayerFactory();
    })

    it("Should get a football player by id", async () => {
        const player = await playerFactory.makeMySQLPlayer({});

        const response = await request(app).get(`/football/player/${player.id}`).send();

        expect(response.body.player).toEqual(
            expect.objectContaining({ id: player.id })
        );
    });

    it("Should get a salon football player by id", async () => {
        const team = await teamFactory.makePostgresTeam({});
        const player = await playerFactory.makePostgresPlayer({
            team_id: team.id
        });

        const response = await request(app).get(`/salon/player/${player.id}`).send();

        expect(response.body.player).toEqual(
            expect.objectContaining({ id: player.id })
        );
    });
});