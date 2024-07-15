import request from 'supertest';
import { app } from '../../../app';
import { PlayerFactory } from '../../../../test/factories/make-player-factory';
import { TeamFactory } from '../../../../test/factories/make-team-factory';

describe("Update Player (e2e)", async () => {
    let teamFactory: TeamFactory;
    let playerFactory: PlayerFactory;

    beforeAll(() => {
        teamFactory = new TeamFactory();
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

    it("Should Update salon player", async () => {
        const team = await teamFactory.makePostgresTeam({});
        const player = await playerFactory.makePostgresPlayer({ position: 'pivô', starter: false, team_id: team.id });

        const response = await request(app).put(`/salon/player/${player.id}`).send({
            name: player.name,
            shirt_number: player.shirt_number,
            position: 'Ala',
            starter: true,
            team_id: player.team_id
        }); 

        expect(response.status).toEqual(200);
        expect(response.body.player).toEqual(
            expect.objectContaining({ position: 'Ala', starter: true })
        );
    });
});