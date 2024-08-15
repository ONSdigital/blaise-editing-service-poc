import express, { Request, Response } from 'express';
import { User } from 'blaise-api-node-client';
import { Controller } from '../interfaces/controllerInterface';
import notFound from '../helpers/axiosHelper';
import BlaiseApi from '../api/BlaiseApi';

export default class UserController implements Controller {
  blaiseApi: BlaiseApi;

  constructor(blaiseApi: BlaiseApi) {
    this.blaiseApi = blaiseApi;
    this.getUsers = this.getUsers.bind(this);
  }

  getRoutes() {
    const router = express.Router();
    return router.get('/api/users', this.getUsers);
  }

  async getUsers(request: Request<{}, {}, {}, { userRole:string }>, response: Response<User[]>) {
    try {
      const userList = await this.blaiseApi.getUsers();
      if (request.query.userRole) {
        const { userRole } = request.query;
        return response.status(200).json(userList.filter((user) => user.role === userRole));
      }

      return response.status(200).json(userList);
    } catch (error: unknown) {
      if (notFound(error)) {
        return response.status(404).json();
      }
      return response.status(500).json();
    }
  }
}
