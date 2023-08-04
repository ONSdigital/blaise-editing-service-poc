import { Router } from 'express';

export interface ControllerInterface {
  getRoutes(): Router
}
