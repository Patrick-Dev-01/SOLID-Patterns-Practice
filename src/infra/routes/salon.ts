import express, { Request, Response } from 'express';

import { PostgresTeamRepository } from '../database/postgres/repositories/postgres-team-repository';

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

const postgresTeamRepository = new PostgresTeamRepository();

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

    console.log(result)

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


export { salonRoutes }