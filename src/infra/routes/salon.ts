import express, { Request, Response } from 'express';

import { PostgresTeamRepository } from '../database/postgres/repositories/postgres-team-repository';
import { PostgresPlayerRepository } from '../database/postgres/repositories/postgres-player.repository';
import { PostgresCoachRepository } from '../database/postgres/repositories/postgres-coach.repository';

import { CreateTeamUseCase } from '../../app/use-cases/create-team';
import { CreateTeamController } from '../http/controllers/create-team-controller';
import { FetchTeamsUseCase } from '../../app/use-cases/fetch-teams';
import { FetchTeamsController } from '../http/controllers/fetch-teams-controller';
import { GetTeamByIdUseCase } from '../../app/use-cases/get-team-by-id';
import { GetTeamByIdController } from '../http/controllers/get-team-by-id-controller';
import { UpdateTeamUseCase } from '../../app/use-cases/update-team';
import { UpdateTeamController } from '../http/controllers/update-team-controller';
import { DeleteTeamUseCase } from '../../app/use-cases/delete-team';
import { DeleteTeamController } from '../http/controllers/delete-team-controller';

import { FetchPlayersUseCase } from '../../app/use-cases/fetch-players';
import { FetchPlayersController } from '../http/controllers/fetch-players-controller';
import { GetPlayerByIdUseCase } from '../../app/use-cases/get-player-by-id';
import { GetPlayerByIdController } from '../http/controllers/get-player-by-id-controller';
import { UpdatePlayerUseCase } from '../../app/use-cases/update-player';
import { UpdatePlayerController } from '../http/controllers/update-player-controller';
import { CreatePlayerUseCase } from '../../app/use-cases/create-player';
import { CreatePlayerController } from '../http/controllers/create-player-controller';
import { DeletePlayerUseCase } from '../../app/use-cases/delete-player';
import { DeletePlayerController } from '../http/controllers/delete-player-controller';

import { FetchCoachsUseCase } from '../../app/use-cases/fetch-coachs';
import { FetchCoachsController } from '../http/controllers/fetch-coachs-controller';
import { CreateCoachUseCase } from '../../app/use-cases/create-coach';
import { CreateCoachController } from '../http/controllers/create-coach-controller';
import { GetCoachByIdUseCase } from '../../app/use-cases/get-coach-by-id';
import { GetCoachByIdController } from '../http/controllers/get-coach-by-id-controller';
import { UpdateCoachUseCase } from '../../app/use-cases/update-coach';
import { UpdateCoachController } from '../http/controllers/update-coach-controller';
import { DeleteCoachUseCase } from '../../app/use-cases/delete-coach';
import { DeleteCoachController } from '../http/controllers/delete-coach-controller';

const postgresTeamRepository = new PostgresTeamRepository();
const postgresPlayerRepository = new PostgresPlayerRepository();
const postgresCoachRepository = new PostgresCoachRepository();

const salonRoutes = express.Router();

salonRoutes.get("/team", async (request: Request, response: Response) => {
    const fetchTeamsUseCase = new FetchTeamsUseCase(postgresTeamRepository);
    const fetchTeamsController = new FetchTeamsController(fetchTeamsUseCase);

    const result = await fetchTeamsController.handle();

    response.status(200).json(result);
});

salonRoutes.get("/team/:id", async (request: Request, response: Response) => {
    const { id } = request.params;

    const getTeamByIdUseCase = new GetTeamByIdUseCase(postgresTeamRepository);
    const getTeamByIdController = new GetTeamByIdController(getTeamByIdUseCase);

    const result = await getTeamByIdController.handle(id);

    response.status(200).json(result);
});

salonRoutes.post("/team", async (request: Request, response: Response) => {
    const createTeamUseCase = new CreateTeamUseCase(postgresTeamRepository);
    const createTeamController = new CreateTeamController(createTeamUseCase);

    const result = await createTeamController.handle(request.body);

    if(!result){
        response.status(401).json(result);
    }

    response.status(201).json(result);
});

salonRoutes.put("/team/:id", async (request: Request, response: Response) => {
    const { id } = request.params;

    const updateTeamUseCase = new UpdateTeamUseCase(postgresTeamRepository);
    const updateTeamController = new UpdateTeamController(updateTeamUseCase);
    
    const result = await updateTeamController.handle(id, request.body);

    response.status(200).json(result);
});

salonRoutes.delete("/team/:id", async (request: Request, response: Response) => {
    const { id } = request.params;

    const deleteTeamUseCase = new DeleteTeamUseCase(postgresTeamRepository);
    const deleteTeamController = new DeleteTeamController(deleteTeamUseCase);
    
    const result = await deleteTeamController.handle(id);

    response.status(204).json(result);
});

/* Players */

salonRoutes.get("/player", async (request: Request, response: Response) => {    
    const fetchPlayersUseCase = new FetchPlayersUseCase(postgresPlayerRepository);
    const fetchPlayersController = new FetchPlayersController(fetchPlayersUseCase);
    
    const result = await fetchPlayersController.handle();
    
    response.status(200).json(result);
});

salonRoutes.get("/player/:id", async (request: Request, response: Response) => {
    const { id } = request.params;
    
    const getPlayerByIdUseCase = new GetPlayerByIdUseCase(postgresPlayerRepository);
    const getPlayerByIdController = new GetPlayerByIdController(getPlayerByIdUseCase);
    
    const result = await getPlayerByIdController.handle(id);
    
    response.status(200).json(result);
});
    
salonRoutes.put("/player/:id", async (request: Request, response: Response) => {
    const { id } = request.params;
    
    const updatePlayerUseCase = new UpdatePlayerUseCase(postgresPlayerRepository);
    const updatePlayerController = new UpdatePlayerController(updatePlayerUseCase);
    
    const result = await updatePlayerController.handle(id, request.body);
    
    response.status(200).json(result);
});
        
salonRoutes.post("/player", async (request: Request, response: Response) => {
    const createPlayerUseCase = new CreatePlayerUseCase(postgresPlayerRepository);
    const createPlayerController = new CreatePlayerController(createPlayerUseCase);

    const result = await createPlayerController.handle(request.body);

    if(!result){
        response.status(401).json(result);
    }

    response.status(201).json(result);
});

salonRoutes.delete("/player/:id", async (request: Request, response: Response) => {
    const { id } = request.params;

    const deletePlayerUseCase = new DeletePlayerUseCase(postgresPlayerRepository);
    const deletePlayerController = new DeletePlayerController(deletePlayerUseCase);
    
    const result = await deletePlayerController.handle(id);

    response.status(204).json(result);
});

// Coachs

salonRoutes.get("/coach", async (request: Request, response: Response) => {    
    const fetchCoachsUseCase = new FetchCoachsUseCase(postgresCoachRepository);
    const fetchCoachsController = new FetchCoachsController(fetchCoachsUseCase);
    
    const result = await fetchCoachsController.handle();
    
    response.status(200).json(result);
});

salonRoutes.post("/coach", async (request: Request, response: Response) => {    
    const createCoachUseCase = new CreateCoachUseCase(postgresCoachRepository);
    const createCoachController = new CreateCoachController(createCoachUseCase);
    
    const result = await createCoachController.handle(request.body);
    
    response.status(201).json(result);
});

salonRoutes.get("/coach/:id", async (request: Request, response: Response) => {
    const { id } = request.params;
    
    const getCoachByIdUseCase = new GetCoachByIdUseCase(postgresCoachRepository);
    const getCoachByIdController = new GetCoachByIdController(getCoachByIdUseCase);
    
    const result = await getCoachByIdController.handle(id);
    
    response.status(200).json(result);
});

salonRoutes.put("/coach/:id", async (request: Request, response: Response) => {
    const { id } = request.params;
    
    const updateCoachUseCase = new UpdateCoachUseCase(postgresCoachRepository);
    const updateCoachController = new UpdateCoachController(updateCoachUseCase);
    
    const result = await updateCoachController.handle(id, request.body);
    
    response.status(200).json(result);
});

salonRoutes.delete("/coach/:id", async (request: Request, response: Response) => {
    const { id } = request.params;

    const deleteCoachUseCase = new DeleteCoachUseCase(postgresCoachRepository);
    const deleteCoachController = new DeleteCoachController(deleteCoachUseCase);
    
    const result = await deleteCoachController.handle(id);

    response.status(204).json(result);
});

export { salonRoutes }
