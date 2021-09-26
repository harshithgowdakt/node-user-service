import { config } from "dotenv";
import { normalize } from "path";

const result = config({ path: `${normalize(`${__dirname}/../.env`)}` });
process.env.ROOT_DIR = normalize(`${__dirname}`);
if (result.error) {
  process.exit(1);
}

import { logger } from "./config/winston/Logger";
import morgan from "morgan";
import express, { Application } from "express";
import { depedencies } from "./depedencies/Depedencies";
import { SequelizeOrm } from "./db/config/SequlizeOrm";
import { IRoutes } from "./routes/models/IRoutes";
import { jwtInstance } from "./config/jwt/Jwt";


class Server {
  private app: Application;
  private port: string | number;
  private sequalizeOrm: SequelizeOrm;
  private routes: IRoutes[];

  constructor(sequalizeOrm: SequelizeOrm, routes: IRoutes[], port: string | number) {
    this.app = express();
    this.port = port;
    this.sequalizeOrm = sequalizeOrm;
    this.routes = routes;
    this.configuration();
    this.initializeRoutes();
  }

  private configuration() {
    this.app.use(express.json());
    this.app.use(morgan('dev'));
    this.app.use(jwtInstance.verifyToken);
    this.app.use(jwtInstance.verifyAdminToken);
  }

  private initializeRoutes() {
    this.routes.forEach((route: IRoutes) => {
      route.intializeRoutes();
      this.app.use('/', route.router);
    });
  }

  private async initializeDb() {
    await this.sequalizeOrm.testDbConnection();
    await this.sequalizeOrm.synchrozeModels();
  }

  private onListening = () => {
    logger.info(`App listening on the port ${this.port}`);
  }

  public listen() {
    this.initializeDb()
      .then(() => {
        this.app.listen(this.port, this.onListening);
      })
      .catch((error) => {
        logger.error(`Error while starting the service ${error}`);
      });
  }
}

const port = process.env.PORT || 8080;
const server = new Server(SequelizeOrm.Instance, depedencies, port);

server.listen();

