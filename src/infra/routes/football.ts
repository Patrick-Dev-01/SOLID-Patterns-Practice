import express, { Request, Response } from 'express';
import { MySQLTeamRepository } from '../database/mysql/repositories/mysql-team-repository';

import { CreateTeamController } from '../http/controllers/create-team-controller';
import { CreateTeamUseCase } from '../../app/use-cases/create-team';
import { UpdateTeamUseCase } from '../../app/use-cases/update-team';
import { UpdateTeamController } from '../http/controllers/update-team-controller';

const footballRoutes = express.Router();

const mySQLTeamRepository = new MySQLTeamRepository();

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

export { footballRoutes }