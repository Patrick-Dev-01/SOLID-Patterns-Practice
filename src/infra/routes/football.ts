import express, { Request, Response } from 'express';

import { MySQLTeamRepository } from '../database/mysql/repositories/mysql-team-repository';
import { MySQLPlayerRepository } from '../database/mysql/repositories/mysql-player-repository';

import { CreateTeamController } from '../http/controllers/create-team-controller';
import { CreateTeamUseCase } from '../../app/use-cases/create-team';
import { UpdateTeamUseCase } from '../../app/use-cases/update-team';
import { UpdateTeamController } from '../http/controllers/update-team-controller';
import { DeleteTeamUseCase } from '../../app/use-cases/delete-team';
import { DeleteTeamController } from '../http/controllers/delete-team-controller';
import { FetchTeamsUseCase } from '../../app/use-cases/fetch-teams';
import { FetchTeamsController } from '../http/controllers/fetch-teams-controller';
import { GetTeamByIdUseCase } from '../../app/use-cases/get-team-by-id';
import { GetTeamByIdController } from '../http/controllers/get-team-by-id-controller';

import { CreatePlayerUseCase } from '../../app/use-cases/create-player';
import { CreatePlayerController } from '../http/controllers/create-player-controller';
import { GetPlayerByIdUseCase } from '../../app/use-cases/get-player-by-id';
import { GetPlayerByIdController } from '../http/controllers/get-player-by-id-controller';
import { UpdatePlayerUseCase } from '../../app/use-cases/update-player';
import { UpdatePlayerController } from '../http/controllers/update-player-controller';
import { FetchPlayersUseCase } from '../../app/use-cases/fetch-players';
import { FetchPlayersController } from '../http/controllers/fetch-players-controller';
import { DeletePlayerUseCase } from '../../app/use-cases/delete-player';
import { DeletePlayerController } from '../http/controllers/delete-player-controller';

const footballRoutes = express.Router();

const mySQLTeamRepository = new MySQLTeamRepository();
const mySQLPlayerRepository = new MySQLPlayerRepository();

/* Teams */

footballRoutes.get("/team", async (request: Request, response: Response) => {
    const fetchTeamsUseCase = new FetchTeamsUseCase(mySQLTeamRepository);
    const fetchTeamsController = new FetchTeamsController(fetchTeamsUseCase);

    const result = await fetchTeamsController.handle();

    response.status(200).json(result);
});

footballRoutes.get("/team/:id", async (request: Request, response: Response) => {
    const { id } = request.params;

    const getTeamByIdUseCase = new GetTeamByIdUseCase(mySQLTeamRepository);
    const getTeamByIdController = new GetTeamByIdController(getTeamByIdUseCase);

    const result = await getTeamByIdController.handle(id);

    response.status(200).json(result);
});

footballRoutes.post("/team", async (request: Request, response: Response) => {
    const createTeamUseCase = new CreateTeamUseCase(mySQLTeamRepository);
    const createTeamController = new CreateTeamController(createTeamUseCase);

    const result = await createTeamController.handle(request.body);

    if(!result){
        response.status(401).json(result);
    }

    response.status(201).json(result);
});

footballRoutes.put("/team/:id", async (request: Request, response: Response) => {
    const { id } = request.params;

    const updateTeamUseCase = new UpdateTeamUseCase(mySQLTeamRepository);
    const updateTeamController = new UpdateTeamController(updateTeamUseCase);
    
    const result = await updateTeamController.handle(id, request.body);

    response.status(200).json(result);
});

footballRoutes.delete("/team/:id", async (request: Request, response: Response) => {
    const { id } = request.params;

    const deleteTeamUseCase = new DeleteTeamUseCase(mySQLTeamRepository);
    const deleteTeamController = new DeleteTeamController(deleteTeamUseCase);
    
    const result = await deleteTeamController.handle(id);

    response.status(204).json(result);
});

/* Players */

footballRoutes.get("/player", async (request: Request, response: Response) => {    
    const fetchPlayersUseCase = new FetchPlayersUseCase(mySQLPlayerRepository);
    const fetchPlayersController = new FetchPlayersController(fetchPlayersUseCase);
    
    const result = await fetchPlayersController.handle();
    
    response.status(200).json(result);
});

footballRoutes.get("/player/:id", async (request: Request, response: Response) => {
    const { id } = request.params;
    
    const getPlayerByIdUseCase = new GetPlayerByIdUseCase(mySQLPlayerRepository);
    const getPlayerByIdController = new GetPlayerByIdController(getPlayerByIdUseCase);
    
    const result = await getPlayerByIdController.handle(id);
    
    response.status(200).json(result);
});
    
footballRoutes.put("/player/:id", async (request: Request, response: Response) => {
    const { id } = request.params;
    
    const updatePlayerUseCase = new UpdatePlayerUseCase(mySQLPlayerRepository);
    const updatePlayerController = new UpdatePlayerController(updatePlayerUseCase);
    
    const result = await updatePlayerController.handle(id, request.body);
    
    response.status(200).json(result);
});
        
footballRoutes.post("/player", async (request: Request, response: Response) => {
    const createPlayerUseCase = new CreatePlayerUseCase(mySQLPlayerRepository);
    const createPlayerController = new CreatePlayerController(createPlayerUseCase);

    const result = await createPlayerController.handle(request.body);

    if(!result){
        response.status(401).json(result);
    }

    response.status(201).json(result);
});

footballRoutes.delete("/player/:id", async (request: Request, response: Response) => {
    const { id } = request.params;

    const deletePlayerUseCase = new DeletePlayerUseCase(mySQLPlayerRepository);
    const deletePlayerController = new DeletePlayerController(deletePlayerUseCase);
    
    const result = await deletePlayerController.handle(id);

    response.status(204).json(result);
});

export { footballRoutes }