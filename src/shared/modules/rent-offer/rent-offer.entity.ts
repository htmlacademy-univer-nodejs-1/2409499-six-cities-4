/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import typegoose, {defaultClasses, getModelForClass} from '@typegoose/typegoose';
import { UserEntity } from '../user/user.entity.js';
import { RentOffer } from '../../types/rent-offer.type.js';
import { City } from '../../types/city.enum.js';
import { RentOfferType } from '../../types/rent-offer-type.enum.js';
import { Facility } from '../../types/facility.enum.js';
import { User } from '../../types/user.type.js';
import { Coordinates } from '../../types/coordinates.type.js';


const {prop, modelOptions} = typegoose;

export interface RentOfferEntity extends defaultClasses.Base {
}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class RentOfferEntity extends defaultClasses.TimeStamps implements RentOffer {
  @prop({
    required: true,
    minlength: [10, 'Min length for name is 10'],
    maxlength: [100, 'Min length for name is 100']
  })
  public title: string;

  @prop({
    required: true,
    minlength: [20, 'Min length for description is 20'],
    maxlength: [1024, 'Min length for description is 1024']
  })
  public summary: string;

  @prop({required: true})
  public publicationDate: Date;

  @prop({
    required: true,
    type: () => String,
    enum: City
  })
  public city: City;

  @prop({required: true})
  public previewPath: string;

  @prop({
    required: true,
    type: () => [String],
  })
  public photos: string[];

  @prop({required: true})
  public isPremium: boolean;

  @prop({required: true})
  public isFavorite: boolean;

  @prop({required: true})
  public rating: 1 | 2 | 3 | 4 | 5;

  @prop({
    required: true,
    type: () => String,
    enum: RentOfferType
  })
  public offerType: RentOfferType;

  @prop({required: true})
  public roomCount: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

  @prop({required: true})
  public guestCount: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

  @prop({
    required: true,
    min: [100, 'Min length for price is 100'],
    max: [100000, 'Min length for price is 100000'],
  })
  public cost: number;

  @prop({
    required: true,
    type: () => [String],
    enum: Facility
  })
  public facilities: Facility[];

  @prop({
    required: true,
    ref: UserEntity,
  })
  public author: User;

  @prop({default: 0})
  public commentCount: number;

  @prop({required: true})
  public coordinates: Coordinates;
}

export const RentOfferModel = getModelForClass(RentOfferEntity);
