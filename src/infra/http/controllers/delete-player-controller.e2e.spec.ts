import request from 'supertest';
import { app } from '../../../app';
import { PlayerFactory } from '../../../../test/factories/make-player-factory';
import { TeamFactory } from '../../../../test/factories/make-team-factory';

describe("Delete Player (e2e)", async () => {
    let teamFactory: TeamFactory;
    let playerFactory: PlayerFactory;

    beforeAll(() => {
        teamFactory = new TeamFactory();
        playerFactory = new PlayerFactory();
    })

    it("should Delete a football player", async () => {
        const player = await playerFactory.makeMySQLPlayer({});

        const response = await request(app).delete(`/football/player/${player.id}`).send(); 

        expect(response.status).toEqual(204);
    });

    it("should Delete a salon player", async () => {
        const team = await teamFactory.makePostgresTeam({})
        const player = await playerFactory.makePostgresPlayer({
            team_id: team.id
        });

        const response = await request(app).delete(`/salon/player/${player.id}`).send(); 

        expect(response.status).toEqual(204);
    });
});