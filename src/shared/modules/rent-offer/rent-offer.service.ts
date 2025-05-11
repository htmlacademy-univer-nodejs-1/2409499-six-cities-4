import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { RentOfferServiceInterface } from './rent-offer-service.interface.js';
import { RentOfferEntity } from './rent-offer.entity.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/index.js';
import CreateRentOfferDto from './dto/create-rent-offer.dto.js';
import UpdateOfferDto from './dto/update-offer.dto.js';

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
    return this.offerModel.findById(offerId).populate('offerId').exec();
  }

  public async find(count?: number): Promise<DocumentType<RentOfferEntity>[]> {
    const limitCount = count ?? 60;
    return this.offerModel
      .find()
      .sort({createdAt: 1})
      .limit(limitCount)
      .populate('offerId')
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<RentOfferEntity> | null> {
    return this.offerModel.findByIdAndDelete(offerId).exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<RentOfferEntity> | null> {
    return this.offerModel.findByIdAndUpdate(offerId, dto, {new: true}).populate('offerId').exec();
  }

  public async getDetailsInfo(offerId: string): Promise<DocumentType<RentOfferEntity> | null> {
    return this.offerModel.findById(offerId).exec();
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<RentOfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {
        '$inc': {
          commentCount: 1,
        }
      }).exec();
  }

  public async getPremium(): Promise<DocumentType<RentOfferEntity>[]> {
    return this.offerModel.find({flagIsPremium: true}).populate('offerId').exec();
  }

  public async getFavorite(): Promise<DocumentType<RentOfferEntity>[]> {
    return this.offerModel.find({flagIsFavourites: true}).populate('offerId').exec();
  }

  public async calculateRating(rating: number, newRating: number, countRating: number, offerId: string): Promise<void> {
    await this.offerModel.findByIdAndUpdate(offerId, {rating: (newRating + rating) / countRating}, {new: true}).exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: documentId})) !== null;
  }
}
