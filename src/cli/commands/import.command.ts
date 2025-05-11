import chalk from 'chalk';
import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { createOffer, getErrorMessage, getMongoURI } from '../../shared/helpers/index.js';
import UserService from '../../shared/modules/user/user.service.js';
import RentOfferService from '../../shared/modules/rent-offer/rent-offer.service.js';
import { DatabaseClient } from '../../shared/libs/database-client/database-client.interface.js';
import { Logger } from '../../shared/libs/logger/index.js';
import { DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD } from './command.constant.js';
import { ConsoleLogger } from '../../shared/libs/logger/console.logger.js';
import { MongoDatabaseClient } from '../../shared/libs/database-client/index.js';
import { UserModel } from '../../shared/modules/user/user.entity.js';
import { RentOfferModel } from '../../shared/modules/rent-offer/rent-offer.entity.js';
import { RentOffer } from '../../shared/types/rent-offer.type.js';

export class ImportCommand implements Command {
  private userService: UserService;
  private rentOfferService: RentOfferService;
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.rentOfferService = new RentOfferService(this.logger, RentOfferModel);
    this.userService = new UserService(this.logger, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  private async saveOffer(offer: RentOffer) {
    const user = await this.userService.findOrCreate({
      ...offer.author,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    await this.rentOfferService.create({
      ...offer,
      author: user,
    });
  }

  public getName(): string {
    return '--import';
  }

  public async execute(
    filename: string,
    login: string,
    password: string,
    host: string,
    dbname: string,
    salt: string,
  ): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseClient.connect(uri);
    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(chalk.red(`Can't import data from file: ${filename}`));
      console.error(chalk.red(getErrorMessage(error)));
    }
  }
}
