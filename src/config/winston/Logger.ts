import winston, { createLogger, format, transports } from "winston";
import { normalize } from "path";

class Logger {
  private logger: winston.Logger;
  private transports: winston.transport | winston.transport[];
  private format: winston.Logform.Format;
  private readonly rootDir: string;
  private static instance: Logger;

  constructor() {
    this.rootDir = this.initializeRootDir();
    this.transports = this.initializeTransport();
    this.format = this.initializeFormat();
    this.logger = this.initializeLogger();
  }

  private initializeRootDir() {
    if (process.env.ROOT_DIR) {
      return process.env.ROOT_DIR;
    } else {
      return normalize(`${__dirname}/../../../`);
    }
  }

  private initializeTransport() {
    return [
      new transports.File({
        filename: 'error.log',
        dirname: `${this.rootDir}/logs`,
        level: 'error'
      }),
      new transports.File({
        filename: 'out.log',
        dirname: `${this.rootDir}/logs`,
      })
    ]
  }

  private initializeFormat() {
    return format.combine(
      format.timestamp({
        format: 'DD-MM-YYYY HH:mm:ss'
      }),
      format.errors({ stack: true }),
      format.splat(),
      format.json()
    )
  }

  private initializeLogger() {
    let logger = createLogger({
      level: 'info',
      format: this.format,
      transports: this.transports
    })
    if (process.env.NODE_ENV !== 'production') {
      logger.add(new transports.Console({ 
        format: format.combine(
          format.colorize(), 
          format.simple())
      }));
    }
    return logger;
  }

  static get Instance(): winston.Logger {
    if (!this.instance) {
      this.instance = new Logger();
    }
    return this.instance.logger;
  }
}

export let logger = Logger.Instance;
