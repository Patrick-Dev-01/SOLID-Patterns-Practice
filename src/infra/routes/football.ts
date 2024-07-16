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

import { CreateCoachUseCase } from '../../app/use-cases/create-coach';
import { MySQLCoachRepository } from '../database/mysql/repositories/mysql-coach-repository';
import { CreateCoachController } from '../http/controllers/create-coach-controller';
import { GetCoachByIdUseCase } from '../../app/use-cases/get-coach-by-id';
import { GetCoachByIdController } from '../http/controllers/get-coach-by-id-controller';
import { UpdateCoachUseCase } from '../../app/use-cases/update-coach';
import { UpdateCoachController } from '../http/controllers/update-coach-controller';
import { DeleteCoachUseCase } from '../../app/use-cases/delete-coach';
import { DeleteCoachController } from '../http/controllers/delete-coach-controller';
import { FetchCoachsUseCase } from '../../app/use-cases/fetch-coachs';
import { FetchCoachsController } from '../http/controllers/fetch-coachs-controller';
import { validateData } from '../http/middleware/zod';

const footballRoutes = express.Router();

// interface
const mySQLTeamRepository = new MySQLTeamRepository();
const mySQLPlayerRepository = new MySQLPlayerRepository();
const mySQLCoachRepository = new MySQLCoachRepository(); 

/* Teams */

footballRoutes.get("/team", async (request: Request, response: Response) => {
    // serviço
    const fetchTeamsUseCase = new FetchTeamsUseCase(mySQLTeamRepository);
    // controller
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

/* Coaches */

footballRoutes.get("/coach", async (request: Request, response: Response) => {    
    const fetchCoachsUseCase = new FetchCoachsUseCase(mySQLCoachRepository);
    const fetchCoachsController = new FetchCoachsController(fetchCoachsUseCase);
    
    const result = await fetchCoachsController.handle();
    
    response.status(200).json(result);
});

footballRoutes.post("/coach", async (request: Request, response: Response) => {    
    const createCoachUseCase = new CreateCoachUseCase(mySQLCoachRepository);
    const createCoachController = new CreateCoachController(createCoachUseCase);
    
    const result = await createCoachController.handle(request.body);
    
    response.status(201).json(result);
});

footballRoutes.get("/coach/:id", async (request: Request, response: Response) => {
    const { id } = request.params;
    
    const getCoachByIdUseCase = new GetCoachByIdUseCase(mySQLCoachRepository);
    const getCoachByIdController = new GetCoachByIdController(getCoachByIdUseCase);
    
    const result = await getCoachByIdController.handle(id);
    
    response.status(200).json(result);
});

footballRoutes.put("/coach/:id", async (request: Request, response: Response) => {
    const { id } = request.params;
    
    const updateCoachUseCase = new UpdateCoachUseCase(mySQLCoachRepository);
    const updateCoachController = new UpdateCoachController(updateCoachUseCase);
    
    const result = await updateCoachController.handle(id, request.body);
    
    response.status(200).json(result);
});

footballRoutes.delete("/coach/:id", async (request: Request, response: Response) => {
    const { id } = request.params;

    const deleteCoachUseCase = new DeleteCoachUseCase(mySQLCoachRepository);
    const deleteCoachController = new DeleteCoachController(deleteCoachUseCase);
    
    const result = await deleteCoachController.handle(id);

    response.status(204).json(result);
});

export { footballRoutes }