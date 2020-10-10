import { Sequelize, Dialect, DataTypes, Model, ModelCtor } from 'sequelize';
import fs from 'fs';
import { join } from 'path';
import _ from 'lodash';
import * as config from "../../config/config.json";
import { logger } from '../../config/winston/Logger';
import { IOrm } from '../models/IOrm';

export class SequelizeOrm implements IOrm {
  private static _instance: SequelizeOrm;
  private sequelize: Sequelize;
  private sequelizeOptions: any;
  private readonly modelsDir: string;
  private db: any = {};

  private constructor() {
    this.modelsDir = `${process.env.ROOT_DIR}/${config.sequelizeOrm.modelsDir}`;
    this.sequelizeOptions = config.sequelizeOptions;
    this.sequelize = this.intializeOrm();
    this.intializeModels();
  }

  private intializeOrm() {
    let dialect = "mysql" as Dialect;
    this.sequelizeOptions.dialect = dialect;
    return new Sequelize(
      config.mysql.database,
      config.mysql.user,
      config.mysql.password,
      this.sequelizeOptions
    );
  }

  private intializeModels() {
    fs.readdirSync(this.modelsDir)
      .filter((file) => (file.indexOf('.') !== 0) && (file.indexOf('.map') === -1))
      .forEach((file) => {
        logger.info(`Loading model file ${file}`);
        const model = require(join(this.modelsDir, file))(this.sequelize, DataTypes);
        this.db[model.name] = model;
      });
  }

  async synchrozeModels() {
    try {
      await this.sequelize.sync();
      logger.info('Database synchronized');
    } catch (error) {
      logger.error('Error while synchronizing models', error);
      throw error;
    }
  }

  async testDbConnection() {
    try {
      await this.sequelize.authenticate();
      logger.info('Connection has been established successfully.');
    } catch (error) {
      logger.error('Unable to connect to the database:', error);
      throw error;
    }
  }

  getOrmInstance() {
    return _.extend({
      sequelize: this.sequelize,
      Sequelize: Sequelize,
    }, this.db);
  }

  static get Instance(): SequelizeOrm {
    if (!this._instance) {
      this._instance = new SequelizeOrm();
    }
    return this._instance;
  }
}
