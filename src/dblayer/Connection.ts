import { MongoClient, Db } from "mongodb"
import fs from "fs"

const configFile = fs.readFileSync(__dirname + "/../config/config.json"),
  config = JSON.parse(configFile.toString());

export class Connection {
  ipAddress: string;
  dbName: string;
  port: string;

  constructor() {
    this.ipAddress = config.mongodb.ipAddress;
    this.dbName = config.mongodb.dbName;
    this.port = config.mongodb.port;
  }

  public async getConnection() {
    try {
      return await MongoClient.connect('mongodb://localhost:27017',
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      );
    } catch (error) {
      throw error;
    }
  }

  public async getDb(dbName: string) {
    const client = await this.getConnection();
    return client.db(dbName);
  }

  public async getCollection(collectionName: string) {
    const db = await this.getDb('harshith');
    return db.collection(collectionName)
  }
}

export const dbLayer = new Connection();

