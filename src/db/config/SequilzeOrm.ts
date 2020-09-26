import { Sequelize, Dialect, DataTypes, Model, ModelCtor } from 'sequelize';
import fs from 'fs';
import { normalize, join } from 'path';
import _ from 'lodash';
import * as config from "../../config/config.json";
import { logger } from '../../config/winston/Logger';

export class SequelizeOrm {
  private instance: any = {};
  private sequelize: Sequelize;
  private sequelizeOptions: any;
  private readonly rootDir: string;
  private readonly modelsDir: string;
  private db: any = {};

  constructor() {
    this.rootDir = normalize(`${__dirname}/../../`);
    this.modelsDir = `${this.rootDir}/db/config/models`;
    this.sequelizeOptions = config.sequelizeOptions;
    this.sequelize = this.intializeSequelize();
    this.intializeSequelizeModel();
  }

  private intializeSequelize() {
    let dialect = "mysql" as Dialect;
    this.sequelizeOptions.dialect = dialect;
    return new Sequelize(
      config.mysql.database,
      config.mysql.user,
      config.mysql.password,
      this.sequelizeOptions
    );
  }

  private intializeSequelizeModel() {
    fs.readdirSync(this.modelsDir)
      .filter((file) => (file.indexOf('.') !== 0) && (file.indexOf('.map') === -1))
      .forEach((file) => {
        logger.info(`Loading model file ${file}`);
        const model = require(join(this.modelsDir, file))(this.sequelize, DataTypes);
        this.db[model.name] = model;
      });
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

  async synchrozieSequelizeModels() {
    try {
      await this.sequelize.sync();
      logger.info('Database synchronized');
    } catch (error) {
      logger.error('Error while synchronizing models', error);
      throw error;
    }
  }

  dbInstance() {
    let sequelize = this.sequelize;
    let db = this.db;
    this.instance = _.extend({
      sequelize: sequelize,
      Sequelize: Sequelize,
    }, db);
    return this.instance;
  }
} 
