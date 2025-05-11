import { IsArray, IsBoolean, IsDateString, IsInt, IsMongoId, IsNumber, IsObject, IsOptional, IsString, Length, MaxLength, MinLength } from 'class-validator';
import { User } from '../../../types/user.type.js';
import { CreateOfferValidationMessage } from './create-messages.js';
import { City } from '../../../types/city.enum.js';
import { RentOfferType } from '../../../types/rent-offer-type.enum.js';
import { Facility } from '../../../types/facility.enum.js';
import { Coordinates } from '../../../types/coordinates.type.js';

export default class UpdateOfferDto {
  @IsOptional()
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
    title?: string;

  @IsOptional()
  @MinLength(20, { message: CreateOfferValidationMessage.summary.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.summary.maxLength })
    summary?: string;

  @IsOptional()
  @IsDateString({}, {message: CreateOfferValidationMessage.publicationDate.invalidFormat})
    publicationDate?: Date;

  @IsOptional()
  @IsString({message: CreateOfferValidationMessage.city.invalidFormat})
    city?: City;

  @IsOptional()
  @IsString({message: CreateOfferValidationMessage.previewPath.invalidFormat})
    previewPath?: string;

  @IsOptional()
  @IsArray({message: CreateOfferValidationMessage.photos.invalidFormat})
    photos?: string[];

  @IsOptional()
  @IsBoolean({message: CreateOfferValidationMessage.isPremium.invalidFormat})
    isPremium!: boolean;

  @IsOptional()
  @IsBoolean({message: CreateOfferValidationMessage.isFavorite.invalidFormat})
    isFavorite?: boolean;

  @IsOptional()
  @IsNumber({}, {message: CreateOfferValidationMessage.rating.invalidFormat})
  @Length(1, 5, {message: CreateOfferValidationMessage.rating.lengthField})
    rating?: 1 | 2 | 3 | 4 | 5;

  @IsOptional()
  @IsString({message: CreateOfferValidationMessage.offerType.invalidFormat})
    offerType?: RentOfferType;

  @IsOptional()
  @IsInt({message: CreateOfferValidationMessage.roomCount.invalidFormat})
  @Length(1, 8, {message: CreateOfferValidationMessage.roomCount.lengthField})
    roomCount?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

  @IsOptional()
  @IsInt({message: CreateOfferValidationMessage.guestCount.invalidFormat})
  @Length(1, 10, {message: CreateOfferValidationMessage.guestCount.lengthField})
    guestCount?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

  @IsOptional()
  @IsNumber({}, {message: CreateOfferValidationMessage.cost.invalidFormat})
  @Length(100, 100000, {message: CreateOfferValidationMessage.cost.lengthField})
    cost?: number;

  @IsOptional()
  @IsArray({message: CreateOfferValidationMessage.facilities.invalidFormat})
    facilities?: Facility[];

  @IsOptional()
  @IsMongoId({ message: CreateOfferValidationMessage.author.invalidId })
    author?: User;

  @IsOptional()
    commentCount?: number;

  @IsOptional()
  @IsObject({message:CreateOfferValidationMessage.coordinates.invalidFormat})
    coordinates?: Coordinates;
}
