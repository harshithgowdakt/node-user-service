export interface IOrm {
  testDbConnection(): Promise<void>;
  getOrmInstance(): any;
}
