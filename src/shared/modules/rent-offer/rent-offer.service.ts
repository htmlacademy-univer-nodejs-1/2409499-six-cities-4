import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { RentOfferServiceInterface } from './rent-offer-service.interface.js';
import { RentOfferEntity } from './rent-offer.entity.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/index.js';
import CreateRentOfferDto from './dto/create-rent-offer.dto.js';

@injectable()
export default class RentOfferService implements RentOfferServiceInterface {
  constructor(
        @inject(Component.Logger) private readonly logger: Logger,
        @inject(Component.RentOfferModel) private readonly offerModel: types.ModelType<RentOfferEntity>
  ) {}

  public async create(dto: CreateRentOfferDto): Promise<DocumentType<RentOfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<RentOfferEntity> | null> {
    return this.offerModel.findById(offerId).exec();
  }
}
