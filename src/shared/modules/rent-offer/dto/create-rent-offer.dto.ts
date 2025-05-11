import { IsArray, IsBoolean, IsDateString, IsInt, IsMongoId, IsNumber, IsObject, IsString, Length, MaxLength, MinLength } from 'class-validator';
import { User } from '../../../types/user.type.js';
import { CreateOfferValidationMessage } from './create-messages.js';
import { RentOfferType } from '../../../types/rent-offer-type.enum.js';
import { Facility } from '../../../types/facility.enum.js';
import { Coordinates } from '../../../types/coordinates.type.js';
import { City } from '../../../types/city.enum.js';

export default class CreateRentOfferDto {
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
    title!: string;

  @MinLength(20, { message: CreateOfferValidationMessage.summary.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.summary.maxLength })
    summary!: string;

  @IsDateString({}, {message: CreateOfferValidationMessage.publicationDate.invalidFormat})
    publicationDate!: Date;

  @IsString({message: CreateOfferValidationMessage.city.invalidFormat})
    city!: City;

  @IsString({message: CreateOfferValidationMessage.previewPath.invalidFormat})
    previewPath!: string;

  @IsArray({message: CreateOfferValidationMessage.photos.invalidFormat})
    photos!: string[];

  @IsBoolean({message: CreateOfferValidationMessage.isPremium.invalidFormat})
    isPremium!: boolean;

  @IsBoolean({message: CreateOfferValidationMessage.isFavorite.invalidFormat})
    isFavorite!: boolean;

  @IsNumber({}, {message: CreateOfferValidationMessage.rating.invalidFormat})
  @Length(1, 5, {message: CreateOfferValidationMessage.rating.lengthField})
    rating!: 1 | 2 | 3 | 4 | 5;

  @IsString({message: CreateOfferValidationMessage.offerType.invalidFormat})
    offerType!: RentOfferType;

  @IsInt({message: CreateOfferValidationMessage.roomCount.invalidFormat})
  @Length(1, 8, {message: CreateOfferValidationMessage.roomCount.lengthField})
    roomCount!: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

  @IsInt({message: CreateOfferValidationMessage.guestCount.invalidFormat})
  @Length(1, 10, {message: CreateOfferValidationMessage.guestCount.lengthField})
    guestCount!: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

  @IsNumber({}, {message: CreateOfferValidationMessage.cost.invalidFormat})
  @Length(100, 100000, {message: CreateOfferValidationMessage.cost.lengthField})
    cost!: number;

  @IsArray({message: CreateOfferValidationMessage.facilities.invalidFormat})
    facilities!: Facility[];

  @IsMongoId({ message: CreateOfferValidationMessage.author.invalidId })
    author!: User;

  commentCount!: number;

  @IsObject({message:CreateOfferValidationMessage.coordinates.invalidFormat})
    coordinates!: Coordinates;
}
