import { City } from '../../../types/city.enum.js';
import { Coordinates } from '../../../types/coordinates.type.js';
import { Facility } from '../../../types/facility.enum.js';
import { RentOfferType } from '../../../types/rent-offer-type.enum.js';
import { User } from '../../../types/user.type.js';

export default class UpdateOfferDto {
  title?: string;
  summary?: string;
  publicationDate?: Date;
  city?: City;
  previewPath?: string;
  photos?: string[];
  isPremium?: boolean;
  isFavorite?: boolean;
  rating?: 1 | 2 | 3 | 4 | 5;
  offerType?: RentOfferType;
  roomCount?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  guestCount?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  cost?: number;
  facilities?: Facility[];
  author?: User;
  commentCount?: number;
  coordinates?: Coordinates;
}
