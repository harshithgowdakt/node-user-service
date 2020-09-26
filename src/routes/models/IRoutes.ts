import { Router } from "express";

export interface IRoutes {
  router: Router
  intializeRoutes(): void;
}
