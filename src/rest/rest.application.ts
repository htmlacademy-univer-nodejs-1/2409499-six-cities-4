import { inject, injectable } from 'inversify';
import express, {Express} from 'express';
import { Config, RestSchema } from '../shared/libs/config/index.js';
import { Logger } from '../shared/libs/logger/index.js';
import { Component } from '../shared/types/component.enum.js';
import { DatabaseClient } from '../shared/libs/database-client/index.js';
import { getMongoURI } from '../shared/helpers/index.js';
import { ExceptionFilterInterface } from '../shared/exception-filter/exception-filter.interface.js';
import { BaseController } from '../shared/controller/base-controller.js';

@injectable()
export class RestApplication {
  private server: Express;
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient,
    @inject(Component.ExceptionFilterInterface) private readonly exceptionFilter: ExceptionFilterInterface,
    @inject(Component.UserController) private readonly userController: BaseController,
    @inject(Component.OfferController) private readonly rentOfferController: BaseController,
  ) {
    this.server = express();
  }

  private async initDb() {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    return this.databaseClient.connect(mongoUri);
  }

  private async initServer() {
    this.logger.info('Inizialization of server');
    const port = this.config.get('PORT');
    this.server.listen(port);
    this.logger.info(`Server initialization completed. Started on http://localhost:${this.config.get('PORT')}`);
  }

  private async initControllers(){
    this.logger.info('Controller init');
    this.server.use('/users', this.userController.router);
    this.server.use('/offers', this.rentOfferController.router);
    this.logger.info('Controller completed');
  }

  private async initMiddleware() {
    this.logger.info('Init middleware');
    this.server.use(express.json());
    this.logger.info('Middleware init completed');
  }

  private async initExceptionFilters() {
    this.logger.info('Init exception filters');
    this.server.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    this.logger.info('Exception filters completed');
  }

  public async init() {
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    this.logger.info('Init database...');
    await this.initDb();
    this.logger.info('Init database completed');
    await this.initMiddleware();
    await this.initExceptionFilters();
    await this.initServer();
    await this.initControllers();
  }
}
